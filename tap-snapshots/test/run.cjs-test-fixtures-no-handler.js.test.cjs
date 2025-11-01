/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.cjs test/fixtures/no-handler.js > TAP > error 1`] = `
Object {
  "code": 1,
  "signal": null,
}

`

exports[`test/run.cjs test/fixtures/no-handler.js > TAP > output 1`] = `


`

exports[`test/run.cjs test/fixtures/no-handler.js > TAP > stderr 1`] = `
TypeError: onerror must be a function
{STACK}
[90m    at Module._compile (node:internal/modules/cjs/loader:1692:14)[39m
{STACK}
[90m    at node:internal/modules/cjs/loader:1824:10[39m
{STACK}
[90m    at Module.load (node:internal/modules/cjs/loader:1427:32)[39m
[90m    at Module._load (node:internal/modules/cjs/loader:1250:12)[39m
[90m    at TracingChannel.traceSync (node:diagnostics_channel:322:14)[39m
[90m    at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)[39m
[90m    at cjsLoader (node:internal/modules/esm/translators:316:5)[39m

`
