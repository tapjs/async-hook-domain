/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/promise-rejections.js TAP > error 1`] = `
null
`

exports[`test/run.js test/fixtures/promise-rejections.js TAP > output 1`] = `
happy timeout
sad timeout

`

exports[`test/run.js test/fixtures/promise-rejections.js TAP > stderr 1`] = `
CAUGHT unhandledRejection Error: happy
{STACK}
CAUGHT unhandledRejection Error: happy2
{STACK}
(node:{PID}) UnhandledPromiseRejectionWarning: Error: sad
{STACK}
(node:{PID}) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 3)

`
