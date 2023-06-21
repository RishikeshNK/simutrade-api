const mongoose = require('mongoose')
const logger = require('./logger')
const config = require('../config')

/**
 * Connects to the MongoDB database using the .env database URI
 */
async function connect() {
  try {
    await mongoose.connect(config.MONGO_URI)
    logger.info('Connected to MongoDB')
  } catch (e) {
    logger.error(`Failed to connect to MongoDB ${e}`)
    process.exit(1)
  }
}

module.exports = connect
