const Domain = require('../../')
const grandparent = new Domain(er => console.error('grandparent'))
const parent = new Domain(er => { throw er })
setTimeout(() => {
  const child = new Domain(er => { throw er })
  setTimeout(() => {
    setTimeout(() => {
      setTimeout(() => {
        throw new Error('yolo')
      })
    })
  })
})
