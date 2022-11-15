#!/usr/bin/env node --unhandled-rejections=warn-with-error-code
require('assert').notEqual(process.execArgv.indexOf('--unhandled-rejections=warn-with-error-code'), -1)
require('./promise-rejections')
