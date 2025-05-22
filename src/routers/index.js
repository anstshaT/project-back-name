import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import summaryRouter from '../routers/summaryRoutes.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);
// router.use('/services', summaryRouter);
router.use('/transactions', summaryRouter);

export default router;
