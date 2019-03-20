const Domain = require('../..')
const d = new Domain(er => { throw er })
Promise.reject(new Error('er'))
