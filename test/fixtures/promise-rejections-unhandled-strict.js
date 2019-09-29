#!/usr/bin/env node --unhandled-rejections=strict
require('assert').notEqual(process.execArgv.indexOf('--unhandled-rejections=strict'), -1)
require('./promise-rejections')
