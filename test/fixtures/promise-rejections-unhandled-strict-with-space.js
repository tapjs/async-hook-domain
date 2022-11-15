#!/usr/bin/env node --unhandled-rejections=none --unhandled-rejections strict
const {notEqual} = require('assert')
notEqual(process.execArgv.indexOf('--unhandled-rejections=none'), -1)
notEqual(process.execArgv.indexOf('--unhandled-rejections'), -1)
notEqual(process.execArgv.indexOf('strict'), -1)
require('./promise-rejections')
