const Domain = require('../..')

process.on('uncaughtException', er =>
  console.log('p.uE', er))

process.on('unhandledRejection', er =>
  console.log('p.uR', er))

setTimeout(() => {
  const d = new Domain(er => console.log('d', er))
  setTimeout(() => {}, 100)
})
setTimeout(() => {
  Promise.reject('foo')
  throw 'bar'
}, 50)
