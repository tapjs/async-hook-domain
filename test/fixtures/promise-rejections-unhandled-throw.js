#!/usr/bin/env node --unhandled-rejections=throw
require('assert').notEqual(process.execArgv.indexOf('--unhandled-rejections=throw'), -1)
require('./promise-rejections')
