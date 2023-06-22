const express = require('express')
const validate = require('../middlewares/validateResource')

const createUserHandler = require('../controllers/user.controller')
const createUserValidator = require('../validators/user.validator')

const userRouter = express.Router()

userRouter.post('/signup', validate(createUserValidator), createUserHandler)

module.exports = userRouter
