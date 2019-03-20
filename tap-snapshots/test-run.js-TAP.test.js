/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/basic.js > error 1`] = `
null
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/basic.js > output 1`] = `
caught: catch this
caught: timeout throw

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/basic.js > stderr 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/destroy.js > error 1`] = `
null
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/destroy.js > output 1`] = `
child 2 err
child err
c walk up to parent

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/destroy.js > stderr 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/no-handler.js > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/no-handler.js > output 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/no-handler.js > stderr 1`] = `

{CWD}/index.js:#
const activateDomains = () => {
                                                                                                                                                                                                                            ^
TypeError: onerror must be a function
{STACK}

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/child.js > error 1`] = `
null
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/child.js > output 1`] = `
parent: throw in main context
child: sync throw in child context
child: setImmediate throw
parent: throw after destroy, go to parent

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/child.js > stderr 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise-throwing-handler.js > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise-throwing-handler.js > output 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise-throwing-handler.js > stderr 1`] = `

{CWD}/test/fixtures/promise-throwing-handler.js:#
Promise.reject(new Error('er'))
               ^
Error: er
{STACK}

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise.js > error 1`] = `
null
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise.js > output 1`] = `
d happy
d 1234
d rejection

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise.js > stderr 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/other-handler.js > error 1`] = `
null
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/other-handler.js > output 1`] = `
p.uE bar
p.uR foo

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/other-handler.js > stderr 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise-no-domain.js > error 1`] = `
null
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise-no-domain.js > output 1`] = `
d caught 1
d caught 2

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/promise-no-domain.js > stderr 1`] = `
(node:57774) UnhandledPromiseRejectionWarning: no one to catch this
(node:57774) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
(node:57774) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
(node:57774) UnhandledPromiseRejectionWarning: sad
(node:57774) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 4)
(node:57774) UnhandledPromiseRejectionWarning: ok
(node:57774) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 5)
(node:57774) UnhandledPromiseRejectionWarning: happy
(node:57774) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 6)

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/throw-in-handler.js > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/throw-in-handler.js > output 1`] = `

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/throw-in-handler.js > stderr 1`] = `

{CWD}/test/fixtures/throw-in-handler.js:#
  throw new Error('errr')
        ^
Error: errr
{STACK}

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/uncaught.js > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}
`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/uncaught.js > output 1`] = `
caught: thrown

`

exports[`test/run.js TAP /Users/isaacs/dev/js/async-hook-domain/test/fixtures/uncaught.js > stderr 1`] = `

{CWD}/test/fixtures/uncaught.js:#
  throw new Error('this will not be caught')
        ^
Error: this will not be caught
{STACK}

`
