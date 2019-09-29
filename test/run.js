const t = require('tap')

const fs = require('fs')
const file = process.argv[2]
const node = process.execPath
const {execFile} = require('child_process')
const {relative} = require('path')

t.cleanSnapshot = o => o
  .replace(/(\n    at [^\n]*)+/g, '\n{STACK}')
  .split(process.cwd()).join('{CWD}')
  .replace(/\.js:[0-9]+(?::[0-9]+)?/g, '.js:#')
  .replace(/[^\n]*DEP0018[^\n]*\n/g, '')
  .replace(/\(node:\d+\)/g, '(node:{PID})')

const runTest = file => t => {
  const firstLine = fs.readFileSync(file, 'utf8').split(/\n/)[0]
  const match = firstLine && firstLine.match(/^#!\/usr\/bin\/env node (.*)$/)
  if (match && process.version.match(/^v([89]|1[01])\./)) {
    return t.plan(0, `skip prior to node v12 (current: ${process.version})`)
  }
  const args = [...(match ? match[1].trim().split(' ') : []), file]
  return execFile(node, args, (er, o, e) => {
    t.matchSnapshot(er ? {code:er.code, signal: er.signal} : null, 'error')
    t.matchSnapshot(o, 'output')
    t.matchSnapshot(e, 'stderr')
    t.end()
  })
}

if (file)
  runTest(file)(t)
else {
  const fixtures = fs.readdirSync(__dirname + '/fixtures')
    .filter(f => /\.js$/.test(f))
    .map(f => relative(process.cwd(), __dirname + '/fixtures/' + f))
  t.plan(fixtures.length)
  t.jobs = require('os').cpus().length
  fixtures.forEach(f => t.test(f, runTest(f)))
}
