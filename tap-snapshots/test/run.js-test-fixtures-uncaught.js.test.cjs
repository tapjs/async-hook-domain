/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/uncaught.js TAP > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}
`

exports[`test/run.js test/fixtures/uncaught.js TAP > output 1`] = `
caught: thrown

`

exports[`test/run.js test/fixtures/uncaught.js TAP > stderr 1`] = `

{CWD}/test/fixtures/uncaught.js:#
  throw new Error('this will not be caught')
        ^
Error: this will not be caught
{STACK}

`
