import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import summaryRouter from '../routers/summaryRoutes.js';
import categoriesRouter from './categoriesRoutes.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/categories', categoriesRouter);
// router.use('/services', summaryRouter);
router.use('/summary', summaryRouter);

export default router;
