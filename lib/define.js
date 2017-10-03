/**
 * Define task
 * @function define
 * @param {string} filename - Script file path
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const path = require('path')
const execcli = require('execcli')

const nameFromFilename = (filename) => [
  path.relative(process.cwd(), path.dirname(filename)).replace(/\//g, '-'),
  path.basename(filename, path.extname(filename))
].join('-')

/** @lends define */
function define (filename, options = {}) {

  const pm2 = (...args) => execcli('pm2', args)

  if (options.instances) {
    console.warn(`instances is deprecated now`)
    delete options.instances
  }
  const {
    name = nameFromFilename(filename)
  } = options

  function task (ctx) {
    return task.run(ctx)
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
      },
      logs (ctx) {
        return pm2('logs', name)
      }
    }
  )
}

module.exports = define


