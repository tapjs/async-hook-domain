const Domain = require('../..')
setImmediate(() => {
  const d = new Domain((er, where) => {
    console.error('CAUGHT', where, er)
  })
  setImmediate(() => Promise.reject(new Error('happy2')))
  Promise.reject(new Error('happy'))
  setTimeout(() => console.log('happy timeout'), 200)
})

setTimeout(() => {
  Promise.reject(new Error('sad'))
  setTimeout(() => console.log('sad timeout'), 100)
}, 150)
