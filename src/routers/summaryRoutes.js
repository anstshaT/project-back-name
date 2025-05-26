import { Router } from 'express';
import { getSummaryController } from '../controllers/transactionsController.js';
import { authenticate } from '../middlewares/authenticate.js';

const summaryRouter = Router();

summaryRouter.get('/:period', authenticate, getSummaryController);

export default summaryRouter;
