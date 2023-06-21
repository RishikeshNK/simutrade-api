const app = require('./app')
const logger = require('./utils/logger')
const connect = require('./utils/connect')
const config = require('./config')

app.listen(config.PORT, () => {
  logger.info(`Simutrade API is listening on port ${config.PORT}`)
  connect()
})
