/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/promise-rejections-unhandled-warn.js TAP > error 1`] = `
null

`

exports[`test/run.js test/fixtures/promise-rejections-unhandled-warn.js TAP > output 1`] = `
happy timeout
sad timeout

`

exports[`test/run.js test/fixtures/promise-rejections-unhandled-warn.js TAP > stderr 1`] = `
CAUGHT unhandledRejection happy
(node:{PID}) UnhandledPromiseRejectionWarning: Error: happy
{STACK}
(node:{PID}) UnhandledPromiseRejectionWarning: ... (rejection id: 1)
CAUGHT unhandledRejection happy2
(node:{PID}) UnhandledPromiseRejectionWarning: Error: happy2
{STACK}
(node:{PID}) UnhandledPromiseRejectionWarning: ... (rejection id: 2)
(node:{PID}) UnhandledPromiseRejectionWarning: Error: sad
{STACK}
(node:{PID}) UnhandledPromiseRejectionWarning: ... (rejection id: 3)

`
