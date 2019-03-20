const Domain = require('../..')

const d = new Domain((e, type) => console.log('caught:', e, type))
setTimeout(() => {
  throw 'timeout throw'
})
throw 'catch this'
