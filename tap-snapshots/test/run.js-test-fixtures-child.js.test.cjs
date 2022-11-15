/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/child.js TAP > error 1`] = `
null

`

exports[`test/run.js test/fixtures/child.js TAP > output 1`] = `
parent: throw in main context
child: sync throw in child context
child: setImmediate throw
parent: throw after destroy, go to parent

`

exports[`test/run.js test/fixtures/child.js TAP > stderr 1`] = `


`
