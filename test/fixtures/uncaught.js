const Domain = require('../..')

setTimeout(() => {
  const d = new Domain(er => console.log('caught:', er))
  setImmediate(() => {
    throw 'thrown'
  })
})

setTimeout(() => {
  throw new Error('this will not be caught')
}, 100)
