#!/usr/bin/env node --unhandled-rejections=warn
const Domain = require('../..')

Promise.reject('no one to catch this')

setTimeout(() => {
  new Domain(er => console.log('d', er))
  Promise.reject('caught 1')
  setTimeout(() => Promise.reject('caught 2'), 250)
})

setTimeout(() => {
  Promise.reject('happy')
  new Promise((_, rej) => rej('sad'))
  Promise.resolve('ok').then(ok => { throw ok })
}, 100)
