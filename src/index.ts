import {
  AsyncHook,
  createHook,
  executionAsyncId,
  HookCallbacks,
} from 'async_hooks'

// grab a reference to this right away, in case the user changes it
// weird thing to do, but this is used in tests a lot, where weird
// things are quite common. Set a dummy process if we don't have it.
const proc =
  typeof process === 'object' && process
    ? process
    : ({
        _handler: null,
        env: {},
        execArgv: [],
        /* c8 ignore start */
        hasUncaughtExceptionCaptureCallback: () => {
          const p = proc as NodeJS.Process & { _handler: any }
          return !!p._handler
        },
        setUncaughtExceptionCaptureCallback: (fn: Function) => {
          const p = proc as NodeJS.Process & { _handler: any }
          p._handler = fn
        },
        /* c8 ignore end */
        listeners: () => ({}),
        emit: () => false,
        once: () => proc,
        on: () => proc,
        removeListener: () => proc,
      } as unknown as NodeJS.Process)

import { writeSync } from 'fs'
import { format } from 'util'
const debugAlways = (() => {
  return (...args: any[]) => writeSync(2, format(...args) + '\n')
})()
const debug = proc.env.ASYNC_HOOK_DOMAIN_DEBUG !== '1' ? () => {} : debugAlways

const domains = new Map()

// possible values here:
// throw (default)
//    we let our rejection handler call the domain handler
// none, warn-with-error-code
//    same as default
// warn
//    same as default (no way to make it any less noisy, sadly)
// strict
//    set the uncaughtExceptionMonitor, because it will throw,
//    but do NOT set our rejection handler, or it'll double-handle
const unhandledRejectionMode = (() => {
  let mode = 'throw'
  for (let i = 0; i < proc.execArgv.length; i++) {
    const m = process.execArgv[i]
    if (m.startsWith('--unhandled-rejections=')) {
      mode = m.substring('--unhandled-rejections='.length)
    } else if (m === '--unhandled-rejections') {
      mode = proc.execArgv[i + 1]
    }
  }
  return mode
})()

// the async hook activation and deactivation
let domainHook: AsyncHook | null = null
const activateDomains = () => {
  if (!domainHook) {
    debug('ACTIVATE')
    domainHook = createHook(hookMethods)
    domainHook.enable()
    proc.on('uncaughtExceptionMonitor', domainErrorHandler)
    if (unhandledRejectionMode !== 'strict') {
      proc.emit = domainProcessEmit as NodeJS.Process['emit']
    }
  }
}
const deactivateDomains = () => {
  if (domainHook) {
    debug('DEACTIVATE')
    domainHook.disable()
    domainHook = null
    proc.removeListener('uncaughtExceptionMonitor', domainErrorHandler)
    proc.emit = originalProcessEmit
  }
}

// monkey patch to silently listen on unhandledRejection, without
// marking the event as 'handled' unless we handled it.
// Do nothing if there's a user handler for the event, though.
const originalProcessEmit = proc.emit
const domainProcessEmit = (ev: string | symbol, ...args: any[]) => {
  if (
    ev !== 'unhandledRejection' ||
    proc.listeners('unhandledRejection').length
  ) {
    //@ts-ignore
    return originalProcessEmit.call(proc, ev, ...args)
  }
  const er = args[0]
  return domainErrorHandler(er, 'unhandledRejection', true)
}

const domainErrorHandler = (
  er: unknown,
  ev?: string,
  rejectionHandler: boolean = false
) => {
  debug('AHD MAYBE HANDLE?', ev, er)
  // if anything else attached a handler, then it's their problem,
  // not ours.  get out of the way.
  if (
    proc.hasUncaughtExceptionCaptureCallback() ||
    proc.listeners('uncaughtException').length > 0
  ) {
    debug('OTHER HANDLER ALREADY SET')
    return false
  }
  const domain = currentDomain()
  if (domain) {
    debug('HAVE DOMAIN')
    try {
      domain.onerror(er, ev)
    } catch (e) {
      debug('ONERROR THREW', e)
      domain.destroy()
      // this is pretty bad.  treat it as a fatal exception, which
      // may or may not be caught in the next domain up.
      // We drop 'from promise', because now it's a throw.
      if (domainErrorHandler(e)) {
        return true
      }
      throw e
    }
    // at this point, we presumably handled the error, and attach a
    // no-op one-time handler to just prevent the crash from happening.
    if (!rejectionHandler) {
      proc.setUncaughtExceptionCaptureCallback(() => {
        debug('UECC ONCE')
        proc.setUncaughtExceptionCaptureCallback(null)
      })
      // in strict mode, node raises the error *before* the uR event,
      // and it warns if the uR event is not handled.
      if (unhandledRejectionMode === 'strict') {
        process.once('unhandledRejection', () => {})
      }
    }
    return true
  }
  return false
}

// the hook callbacks
const hookMethods: HookCallbacks = {
  init(id, type, triggerId) {
    debug('INIT', id, type, triggerId)
    const current = domains.get(triggerId)
    if (current) {
      debug('INIT have current', current)
      current.ids.add(id)
      domains.set(id, current)
      debug('POST INIT', id, type, current)
    }
  },

  destroy(id) {
    const domain = domains.get(id)
    debug('DESTROY', id)
    if (!domain) {
      return
    }
    domains.delete(id)
    domain.ids.delete(id)
    if (!domain.ids.size) {
      domain.destroy()
    }
  },
}

const currentDomain = () => domains.get(executionAsyncId())

let id = 1
export class Domain {
  eid: number
  id: number
  ids: Set<number>
  onerror: (
    er: unknown,
    event: 'uncaughtException' | 'unhandledRejection'
  ) => any
  parent?: Domain
  destroyed: boolean

  constructor(
    onerror: (
      er: unknown,
      event: 'uncaughtException' | 'unhandledRejection'
    ) => any
  ) {
    if (typeof onerror !== 'function') {
      // point at where the wrong thing was actually done
      const er = new TypeError('onerror must be a function')
      Error.captureStackTrace(er, this.constructor)
      throw er
    }
    const eid = executionAsyncId()
    this.eid = eid
    this.id = id++
    this.ids = new Set([eid])
    this.onerror = onerror
    this.parent = domains.get(eid)
    this.destroyed = false
    domains.set(eid, this)
    debug('NEW DOMAIN', this.id, this.eid, this.ids)
    activateDomains()
  }

  destroy() {
    if (this.destroyed) {
      return
    }
    debug('DESTROY DOMAIN', this.id, this.eid, this.ids)
    this.destroyed = true
    // find the nearest non-destroyed parent, assign all ids to it
    let parent = this.parent
    while (parent && parent.destroyed) {
      parent = parent.parent
    }
    this.parent = parent
    if (parent) {
      for (const id of this.ids) {
        domains.set(id, parent)
        parent.ids.add(id)
      }
    } else {
      for (const id of this.ids) {
        domains.delete(id)
      }
    }
    this.ids = new Set()
    if (!domains.size) {
      deactivateDomains()
    }
  }
}
