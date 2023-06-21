const pino = require('pino')

/**
 * Logger for colorized log messages.
 */
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss',
      ignore: 'pid,hostname'
    }
  }
})

module.exports = logger
