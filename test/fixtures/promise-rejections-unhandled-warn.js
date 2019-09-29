#!/usr/bin/env node --unhandled-rejections=warn
require('assert').notEqual(process.execArgv.indexOf('--unhandled-rejections=warn'), -1)
require('./promise-rejections')
