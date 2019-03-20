const Domain = require('../..')

const d = new Domain(er => console.log('d', er))

new Promise((_, rej) =>
  setTimeout(() => rej('rejection')))
Promise.resolve(1234).then(num => { throw num })
Promise.reject('happy')
