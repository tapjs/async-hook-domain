const t = require('tap')

const file = process.argv[2]
const node = process.execPath
const {execFile} = require('child_process')
const {relative} = require('path')

const clean = o => o
  .replace(/(\n    at [^\n]*)+/g, '\n{STACK}')
  .split(process.cwd()).join('{CWD}')
  .replace(/\.js:[0-9]+(?::[0-9]+)?/g, '.js:#')
  .replace(/\(node:\d+\)/g, '(node:{PID})')

const runTest = file => t =>
  execFile(node, [file], (er, o, e) => {
    t.matchSnapshot(er ? {code:er.code, signal: er.signal} : null, 'error')
    t.matchSnapshot(clean(o), 'output')
    t.matchSnapshot(clean(e), 'stderr')
    t.end()
  })

if (file)
  runTest(file)(t)
else {
  const fs = require('fs')
  const fixtures = fs.readdirSync(__dirname + '/fixtures')
    .filter(f => /\.js$/.test(f))
    .map(f => relative(process.cwd(), __dirname + '/fixtures/' + f))
  t.plan(fixtures.length)
  if (process.env.TAP_SNAPSHOT !== '1')
    t.jobs = require('os').cpus().length
  fixtures.forEach(f => t.test(f, runTest(f)))
}
