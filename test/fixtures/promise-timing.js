const Domain = require('../..')
const d1 = new Domain(er => { console.error('domain 1', er) }, 1)
console.error('call new Promise')
new Promise((_, rej) => {
  console.error('in unchained promise')
  const d2 = new Domain(er => { console.error('domain 2', er) }, 2)
  console.error('schedule timeout to rejection')
  setTimeout(() => {
    const d3 = new Domain(er => { console.error('domain 3', er) }, 3)
    console.error('rejection in timeout, expect caught by domain 1')
    rej('rejection should be caught by domain 1')
  })
})

const d4 = new Domain(er => { console.error('domain 4', er) }, 4)
Promise.resolve(1234).then(num => {
  console.error('in chained promise')
  const d5 = new Domain(er => { console.error('domain 5', er) }, 5)
  console.error('throw num')
  throw `${num} expect caught by domain 5`
})

console.error('done with scheduling, trigger immediate rejection')
const d6 = new Domain(er => { console.error('domain 6', er) }, 6)
console.error('reject immediately')
Promise.reject('happy - caught by domain 6')
