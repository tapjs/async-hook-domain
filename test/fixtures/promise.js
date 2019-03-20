const Domain = require('../..')

const d = new Domain((er, type) => console.log('d', er, type))

new Promise((_, rej) =>
  setTimeout(() => rej('rejection')))
Promise.resolve(1234).then(num => { throw num })
Promise.reject('happy')
