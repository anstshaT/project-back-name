import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import transactionRouter from './transactionRoutes.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);
// router.use('/services', summaryRouter);
router.use('/transactions', transactionRouter);

export default router;
