const Domain = require('../..')

const d = new Domain(e => console.log('caught:', e))
setTimeout(() => {
  throw 'timeout throw'
})
throw 'catch this'
