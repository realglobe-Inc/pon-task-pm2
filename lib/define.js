/**
 * Define task
 * @function define
 * @param {string} filename - Script file path
 * @param {Object} [options={}] - Optional settings
 * @param {boolean} [options.waitReady] - Wait to ready ( https://github.com/Unitech/pm2/tree/master/examples/wait-ready )
 * @returns {function} Defined task
 */
'use strict'

const path = require('path')
const argx = require('argx')
const execcli = require('execcli')
const writeout = require('writeout')
const {clone, cleanup} = require('asobj')

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
    env = {},
    maxMemoryRestart = '1G',
    maxRestarts = 100,
    waitReady = false,
    restartDelay = 10,
    interpreter,
  } = options

  const pm2 = async (...args) => await execcli('pm2', args, {
    env: Object.assign({}, process.env, env)
  })

  function task (ctx) {
    return task.start(ctx)
  }

  const exists = async () => {
    try {
      await execcli('pm2', ['show', name], {suppressOut: true})
      return true
    } catch (e) {
      return false
    }
  }

  const subTasks = {
    async start (ctx) {
      const canStart = !(await exists())
      return canStart ? pm2('start', filename, cleanup({
        name,
        cron,
        interpreter,
        waitReady,
        maxRestarts,
        restartDelay,
        maxMemoryRestart,
      })) : subTasks.restart(ctx)
    },
    async stop (ctx) {
      const {logger} = ctx
      const canStop = await exists()
      if (!canStop) {
        logger.debug('Already stopped')
        return
      }
      return pm2('stop', name, {
        force: true
      })
    },
    async show (ctx) {
      return pm2('show', name)
    },
    async del (ctx) {
      return pm2('delete', name)
    },
    async restart (ctx) {
      return pm2('restart', name, {
        updateEnv: true
      })
    },
    async logs (ctx) {
      return pm2('logs', name)
    }
  }
  return Object.assign(task, subTasks)
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
