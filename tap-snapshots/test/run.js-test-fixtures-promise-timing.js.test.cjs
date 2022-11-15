/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/promise-timing.js TAP > error 1`] = `
null

`

exports[`test/run.js test/fixtures/promise-timing.js TAP > output 1`] = `


`

exports[`test/run.js test/fixtures/promise-timing.js TAP > stderr 1`] = `
call new Promise
in unchained promise
schedule timeout to rejection
done with scheduling, trigger immediate rejection
reject immediately
in chained promise
throw num
domain 6 happy - caught by domain 6
domain 5 1234 expect caught by domain 5
rejection in timeout, expect caught by domain 1
domain 1 rejection should be caught by domain 1

`
