const Domain = require('../..')

process = null

setTimeout(() => {
  const d = new Domain(er => console.log('caught:', er))
  setImmediate(() => {
    throw 'thrown'
  })
})

setTimeout(() => {
  throw new Error('this will not be caught')
}, 100)
