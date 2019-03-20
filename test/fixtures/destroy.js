const Domain = require('../..')

// shouldn't catch anything
const d = new Domain(er => { throw er })
d.destroy()
// second time does nothing
d.destroy()
// or does it????!??
d.destroyed = false
d.destroy()

const root = new Domain(er => console.log('root', er))

setImmediate(() => {
  const child = new Domain(er => console.log('child', er))
  setImmediate(() => {
    const child2 = new Domain(er => {
      console.log('child 2', er)
      child2.destroy()
    })
    setImmediate(() => { throw 'err' })
    setImmediate(() => { throw 'err' })
  })
})

setTimeout(() => {
  const c = new Domain(er => console.log('c', er))
  setTimeout(() => {
    const d = new Domain(er => console.log('d', er))
    setTimeout(() => {
      const e = new Domain(er => console.log('e', er))
      setTimeout(() => {
        const f = new Domain(er => console.log('f', er))
        d.destroy()
        e.destroy()
        setTimeout(() => {
          throw 'walk up to parent'
        })
        f.destroy()
      })
    })
  })
}, 100)
