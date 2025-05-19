import { Router } from 'express';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js'; 

const router = Router();
  app.use('/auth', authRouter);
  app.use('/users', userRouter);

  export default router;