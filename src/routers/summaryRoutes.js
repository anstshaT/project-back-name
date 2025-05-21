import express from 'express';
import { getSummaryController } from '../controllers/transactionsController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/summary/:period', authenticate, getSummaryController);

export default router;
