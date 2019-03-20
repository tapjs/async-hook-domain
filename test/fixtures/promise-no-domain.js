const Domain = require('../..')

Promise.reject('no one to catch this')

let d
setTimeout(() => {
  d = new Domain(er => console.log('d', er))
  Promise.reject('caught 1')
  setTimeout(() => Promise.reject('caught 2'), 200)
})

setTimeout(() => {
  Promise.reject('happy')
  new Promise((_, rej) => rej('sad'))
  Promise.resolve('ok').then(ok => { throw ok })
}, 50)
