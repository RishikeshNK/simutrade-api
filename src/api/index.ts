import express from 'express';

import authRouter from './auth/auth.routes';
import usersRouter from './users/users.routes';
import stocksRouter from './stocks/stocks.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/stocks', stocksRouter);

export default router;