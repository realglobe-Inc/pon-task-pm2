/**
 * Define task
 * @function define
 * @param {string} filename - Script file path
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const path = require('path')
const argx = require('argx')
const execcli = require('execcli')
const writeout = require('writeout')
const {clone} = require('asobj')
const {EOL} = require('os')

const nameFromFilename = (filename) => [
  path.relative(process.cwd(), path.dirname(filename)).replace(/\//g, '-'),
  path.basename(filename, path.extname(filename))
].join('-')

/** @lends define */
function define (filename, options = {}) {

  if (options.instances) {
    console.warn(`instances is deprecated now`)
    delete options.instances
  }
  const {
    name = nameFromFilename(filename),
    cron,
    env = {}
  } = options

  const pm2 = (...args) => execcli('pm2', args, {
    env: Object.assign({}, process.env, env)
  })

  function task (ctx) {
    return task.start(ctx)
  }

  return Object.assign(task,
    // Define sub tasks here
    {
      start (ctx) {
        return pm2('start', filename, {
          name,
          cron
        })
      },
      stop (ctx) {
        return pm2('stop', name, {
          force: true
        })
      },
      show (ctx) {
        return pm2('show', name)
      },
      del (ctx) {
        return pm2('delete', name)
      },
      restart (ctx) {
        return pm2('restart', name, {
          updateEnv: true
        })
      },
      logs (ctx) {
        return pm2('logs', name)
      }
    }
  )
}

Object.assign(define, {
  pon (taskNames, options) {
    const a = argx(arguments)
    options = a.pop('object') || {}
    taskNames = a.remain()

    const {
      scriptSavePath = 'tmp/scripts/:name.js',
      name = taskNames.join('-')
    } = options

    const taskOptions = Object.assign(
      clone(options, {without: ['scriptSavePath']}),
      {name}
    )

    const script = `#!/usr/bin/env node
/*
 * This is auto-generated script to pass pon task pm2, created by pon-task-pm2
 */
'use strict'

const {ponfile} = require('pon')
ponfile().run('${(taskNames).join(',')}')
`
    const scriptFile = scriptSavePath.replace(':name', name)
    const defined = define(scriptFile, taskOptions)
    const {start} = defined

    async function startWrap (ctx) {
      await writeout(scriptFile, script, {
        mode: '777',
        force: true,
        mkdirp: true
      })
      return start(ctx)
    }

    return Object.assign(defined, {
      start: startWrap
    })
  }
})

module.exports = define
