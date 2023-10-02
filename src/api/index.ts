import express from 'express';
import authRouter from './auth/auth.routes';
const usersRouter = require('./users/users.routes');


const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;