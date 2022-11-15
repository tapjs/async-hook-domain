const Domain = require('../..')
setImmediate(() => {
  const d = new Domain((er, where) => {
    console.error('CAUGHT', where, er.message)
  })
  setImmediate(() => Promise.reject(new Error('happy2')))
  Promise.reject(new Error('happy'))
  setTimeout(() => console.log('happy timeout'), 100)
})

setTimeout(() => {
  // no domain here, this crashes/warns/etc as normal
  Promise.reject(new Error('sad'))
  setTimeout(() => console.log('sad timeout'), 100)
}, 150)
