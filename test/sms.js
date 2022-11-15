const sms = require('source-map-support')
sms.install({environment:'node', hookRequire: true})
if (process.setSourceMapsEnabled) {
  process.setSourceMapsEnabled(true)
}
