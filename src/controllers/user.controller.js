const { omit } = require('lodash')

const createUser = require('../services/user.service')

/**
 * Create User Handler
 * Express request handler for creating a new user.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 */
async function createUserHandler(req, res) {
  try {
    const user = await createUser(req.body)
    return res.status(201).send(omit(user.toJSON(), 'password'))
  } catch (e) {
    return res.status(409).send({ error: e.message })
  }
}

module.exports = createUserHandler
