/**
 * Validation middleware function to validate an incoming request using a Zod schema
 *
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate the request data against.
 * @returns {function} - An Express middleware function.
 */
const validate = schema => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })
    return next()
  } catch (e) {
    return res.status(400).send({ error: e.errors })
  }
}

module.exports = validate
