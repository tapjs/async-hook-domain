const Domain = require('../..')

const d = new Domain(e => console.log('parent:', e))

let d2
process.nextTick(() => {
  d2 = new Domain(e => console.log('child:', e))
  setImmediate(() => {
    throw 'setImmediate throw'
  })
  setTimeout(() => {
    d2.destroy()
    throw 'throw after destroy, go to parent'
  }, 100)
  throw 'sync throw in child context'
})

throw 'throw in main context'
