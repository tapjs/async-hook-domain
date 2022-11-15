const t = require('tap')

const fs = require('fs')
const file = process.argv[2]

const node = process.execPath
const {execFile} = require('child_process')
const {relative, resolve} = require('path')

t.cleanSnapshot = o => o
  .replace(/(\n    at [^\n]*)+/g, '\n{STACK}')
  .split(process.cwd()).join('{CWD}')
  .replace(/\.js:[0-9]+(?::[0-9]+)?/g, '.js:#')
  .replace(/[^\n]*DEP0018[^\n]*\n/g, '')
  .replace(/\(node:\d+\)/g, '(node:{PID})')
  .replace(/(\(node:{PID}\) UnhandledPromiseRejectionWarning:).*?(\(rejection id: \d+\)\n)/g, '$1 ... $2')
  .replace(/\nNode\.js v?[0-9]+\.[0-9]+\.[0-9]+\n+/g, '')
  .split('\n').filter(l => !/node --trace-/.test(l)).join('\n')

const runTest = file => t => {
  const firstLine = fs.readFileSync(file, 'utf8').split(/\n/)[0]
  // default all node versions to old default for consistency
  const match = firstLine && firstLine.match(/^#!\/usr\/bin\/env node (.*)$/)
    || [,'']

  // node 10 doesn't have support for the --unhandled-rejections node argument
  if (match[0] && process.version.match(/^v([89]|1[01])\./)) {
    return t.plan(0, `skip prior to node v12 (current: ${process.version})`)
  }

  if (!/--unhandled-rejections=/.test(match[1])) {
    match[1] += ' --unhandled-rejections=warn-with-error-code'
  }

  const args = [
    '--require',
    resolve(__dirname, 'sms.js'),
    ...match[1].trim().split(' '),
    file
  ]
  t.comment(`node ${args.join(' ')}`)
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
