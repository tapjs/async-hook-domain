/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.cjs test/fixtures/promise-rejections-unhandled-throw.js > TAP > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}

`

exports[`test/run.cjs test/fixtures/promise-rejections-unhandled-throw.js > TAP > output 1`] = `
happy timeout

`

exports[`test/run.cjs test/fixtures/promise-rejections-unhandled-throw.js > TAP > stderr 1`] = `
CAUGHT unhandledRejection happy
CAUGHT unhandledRejection happy2
Error: sad
{STACK}
[90m    at listOnTimeout (node:internal/timers:608:17)[39m
[90m    at process.processTimers (node:internal/timers:543:7)[39m

`
