const express = require('express')

const userRouter = require('../routes/user.route')

const router = express.Router()

router.use('/user', userRouter)

module.exports = router
