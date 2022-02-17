/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/run.js test/fixtures/promise-rejections-unhandled-strict.js TAP > error 1`] = `
Object {
  "code": null,
  "signal": "SIGABRT",
}
`

exports[`test/run.js test/fixtures/promise-rejections-unhandled-strict.js TAP > output 1`] = `

`

exports[`test/run.js test/fixtures/promise-rejections-unhandled-strict.js TAP > stderr 1`] = `
CAUGHT unhandledRejection Error: happy
{STACK}
/Users/isaacs/.config/nave/installed/16.14.0/bin/node[13725]: ../src/api/callback.cc:141:void node::InternalCallbackScope::Close(): Assertion \`(env_->execution_async_id()) == (0)' failed.
 1: 0x10220e260 node::Abort() [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 2: 0x10220e0a4 node::AppendExceptionLine(node::Environment*, v8::Local<v8::Value>, v8::Local<v8::Message>, node::ErrorHandlingMode) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 3: 0x10215b004 node::InternalCallbackScope::Close() [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 4: 0x10215a7c4 node::InternalCallbackScope::~InternalCallbackScope() [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 5: 0x1021b67c8 node::Environment::RunAndClearNativeImmediates(bool) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 6: 0x1021b621c node::Environment::CheckImmediate(uv_check_s*) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 7: 0x102a8593c uv__run_check [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 8: 0x102a7f698 uv_run [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
 9: 0x10215bccc node::SpinEventLoop(node::Environment*) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
10: 0x102247440 node::NodeMainInstance::Run(int*, node::Environment*) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
11: 0x10224710c node::NodeMainInstance::Run(node::EnvSerializeInfo const*) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
12: 0x1021e0080 node::Start(int, char**) [/Users/isaacs/.config/nave/installed/16.14.0/bin/node]
13: 0x106c5d0f4 

`
