const { z } = require('zod')

/**
 * Zod validator for creating a new User
 */
const createUserValidator = z.object({
  body: z
    .object({
      username: z
        .string({
          required_error: 'Name is required.'
        })
        .min(3, 'Username should be atleast 3 characters long.'),
      password: z
        .string({
          required_error: 'Password is required.'
        })
        .min(6, 'Password should be at least 6 characters long.'),
      confirmPassword: z.string({
        required_error: 'Confirmation password is required.'
      })
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Passwords do not match.',
      path: ['passwordConfirmation']
    })
})

module.exports = createUserValidator
