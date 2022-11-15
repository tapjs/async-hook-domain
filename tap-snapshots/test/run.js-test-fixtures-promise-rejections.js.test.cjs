/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/promise-rejections.js TAP > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}

`

exports[`test/run.js test/fixtures/promise-rejections.js TAP > output 1`] = `
happy timeout
sad timeout

`

exports[`test/run.js test/fixtures/promise-rejections.js TAP > stderr 1`] = `
CAUGHT unhandledRejection happy
CAUGHT unhandledRejection happy2
(node:{PID}) UnhandledPromiseRejectionWarning: Error: sad
{STACK}
(node:{PID}) UnhandledPromiseRejectionWarning: ... (rejection id: 3)

`
