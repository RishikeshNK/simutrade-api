const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/**
 * A Mongoose Schema for storing User objects.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

/**
 * Hashes the user's password before saving to the database.
 *
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
userSchema.pre('save', async function (next) {
  let user = this

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

/**
 * Compares the provided candidate password with the user's hashed password.
 *
 * @param {string} candidate - The candidate password to compare.
 * @returns {Promise<boolean>} - A Promise that resolves to true if the candidate password is a match, or false otherwise.
 */
userSchema.methods.comparePassword = async function (candidate) {
  const user = this

  return bcrypt.compare(candidate, user.password).catch(() => false)
}

/**
 * Represents the User Mongoose model.
 */
const User = mongoose.model('User', userSchema)

module.exports = User
