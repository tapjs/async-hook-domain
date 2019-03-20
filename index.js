const { executionAsyncId, createHook } = require('async_hooks')

/* istanbul ignore next */
const debug = process.env.ASYNC_HOOK_DOMAIN_DEBUG !== '1' ? () => {}
: (() => {
  const {writeSync} = require('fs')
  const {format} = require('util')
  return (...args) => writeSync(2, format(...args) + '\n')
})()

const sms = require('source-map-support')
sms.install({environment:'node'})

const domains = new Map()

// this is to work around the fact that node loses the executionAsyncId
// when a Promise rejects within an async context, for some reason.
// See: https://github.com/nodejs/node/issues/26794
let promiseExecutionId = null
let activePromise = null

// the async hook activation and deactivation
let domainHook = null
const activateDomains = () => {
  if (!domainHook) {
    debug('ACTIVATE')
    domainHook = createHook(hookMethods)
    domainHook.enable()
    process.on('uncaughtException', uncaughtException)
    process.on('unhandledRejection', unhandledRejection)
  }
}
const deactivateDomains = () => {
  if (domainHook) {
    debug('DEACTIVATE')
    domainHook.disable()
    domainHook = null
    process.removeListener('uncaughtException', uncaughtException)
    process.removeListener('unhandledRejection', unhandledRejection)
  }
}

// the hook callbacks
const hookMethods = {
  init (id, type, triggerId, resource) {
    const current = domains.get(triggerId)
    if (current) {
      debug('INIT', id, type, resource, current)
      current.ids.add(id)
      domains.set(id, current)
    }
    if (type === 'PROMISE')
      activePromise = resource.promise
  },

  promiseResolve (id) {
    debug('PROMISE RESOLVE', id)
    promiseExecutionId = id
  },

  after (id) {
    debug('AFTER', id)
    if (id === promiseExecutionId)
      promiseExecutionId = null
  },

  destroy (id) {
    const domain = domains.get(id)
    debug('DESTROY', id, domain)
    if (!domain)
      return
    domains.delete(id)
    domain.ids.delete(id)
    if (!domain.ids.size)
      domain.destroy()
  },
}

// Promise rejection handler
const unhandledRejection = er => {
  debug('UNHANDLED REJECTION', er)
  const domain = domains.get(executionAsyncId())
    || domains.get(promiseExecutionId)
  if (domain) {
    try {
      domain.onerror(er, 'unhandledRejection')
    } catch (e) {
      domain.destroy()
      uncaughtException(e)
    }
  } else if (process.listeners('unhandledRejection').length <= 1) {
    process.removeListener('unhandledRejection', unhandledRejection)
    /* istanbul ignore else */
    if (activePromise) {
      // we reject it a second time, which is somewhat of a weird
      // side effect, but at this point, we know that the promise
      // isn't having its rejections handled, or we wouldn't be here.
      Promise.reject(er)
      setImmediate(() =>
        process.on('unhandledRejection', unhandledRejection))
    } else {
      // treat as fatal, because how could this even happen?
      fatalException(er)
    }
  }
}

// thrown error handler
const uncaughtException = er => {
  debug('UNCAUGHT EXCEPTION', er)
  const domain = domains.get(executionAsyncId())
  if (domain) {
    try {
      domain.onerror(er, 'uncaughtException')
      threw = false
    } catch (e) {
      domain.destroy()
      uncaughtException(e)
    }
  } else if (process.listeners('uncaughtException').length <= 1)
    fatalException(er)
}

const fatalException = er => {
  debug('FATAL')
  // prevent infinite recursion
  process.removeListener('uncaughtException', uncaughtException)
  // set an immediate so that the tick queue isn't empty
  // otherwise the stderr printing won't make it out in time.
  /* istanbul ignore next */
  setImmediate(() => {})
  // ~ ~ ~ FINISH HIM ~ ~ ~
  process._fatalException(er)
}

class Domain {
  constructor (onerror) {
    if (typeof onerror !== 'function')
      throw new TypeError('onerror must be a function')
    const eid = executionAsyncId()
    this.ids = new Set([eid])
    this.onerror = onerror
    this.parent = domains.get(executionAsyncId())
    this.destroyed = false
    domains.set(eid, this)
    activateDomains()
  }

  destroy () {
    if (this.destroyed)
      return
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
      }
    } else {
      for (const id of this.ids) {
        domains.delete(id)
      }
    }
    this.ids = new Set()
    if (!domains.size)
      deactivateDomains()
  }
}

module.exports = Domain
