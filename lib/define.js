/**
 * Define task
 * @function define
 * @param {string} filename - Script file path
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const co = require('co')
const path = require('path')
const execcli = require('execcli')
const { cpus } = require('os')

const nameFromFilename = (filename) => [
  path.relative(process.cwd(), path.dirname(filename)).replace(/\//g, '-'),
  path.basename(filename, path.extname(filename))
].join('-')

/** @lends define */
function define (filename, options = {}) {

  const pm2 = (...args) => execcli('pm2', args)

  const {
    name = nameFromFilename(filename),
    instances = cpus().length
  } = options

  function task (ctx) {
    return co(function * () {

    })
  }

  return Object.assign(task,
    // Define sub tasks here
    {
      start (ctx) {
        return pm2('start', filename, {
          name
        })
      },
      stop (ctx) {
        return pm2('stop', name)
      },
      show (ctx) {
        return pm2('show', name)
      },
      del (ctx) {
        return pm2('delete', name)
      },
      restart (ctx) {
        return pm2('restart', name)
      }
    }
  )
}

module.exports = define


