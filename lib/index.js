/**
 * Pon task to use pm2
 * @module pon-task-pm2
 * @version 2.1.4
 */

'use strict'

const define = require('./define')

let lib = define.bind(this)

Object.assign(lib, define, {
  define
})

module.exports = lib
