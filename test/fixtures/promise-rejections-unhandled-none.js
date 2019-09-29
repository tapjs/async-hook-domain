#!/usr/bin/env node --unhandled-rejections=none
require('assert').notEqual(process.execArgv.indexOf('--unhandled-rejections=none'), -1)
require('./promise-rejections')
