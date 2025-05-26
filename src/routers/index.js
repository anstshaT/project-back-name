import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import categoriesRouter from './categoriesRoutes.js';
import transactionRouter from './transactionRoutes.js';
import summaryRouter from './summaryRoutes.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoriesRouter);
router.use('/summary', summaryRouter);
router.use('/transactions', transactionRouter);

export default router;
