const Domain = require('../..')
const d = new Domain(er => { throw er })

setTimeout(() => {
  throw new Error('errr')
})
