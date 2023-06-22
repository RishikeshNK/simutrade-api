const User = require('../models/user.model')

/**
 * A service to create a new User
 *
 * @param {Object} input - The input object
 * @returns
 */
async function createUser(input) {
  try {
    return await User.create(input)
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = createUser
