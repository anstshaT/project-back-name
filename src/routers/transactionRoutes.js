import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getSummaryController,
  updateTransactionController,
  deleteTransactionController,
} from '../controllers/transactionsController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateParams } from '../middlewares/validateParams.js';
import { transactionIdParamSchema } from '../validation/transaction/transactionIdParam.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateTransactionSchema } from '../validation/transaction/updateTransaction.js';

const router = express.Router();

router.get('/summary/:period', authenticate, getSummaryController);

router.patch(
  '/:id',
  authenticate,
  validateParams(transactionIdParamSchema),
  validateBody(updateTransactionSchema),
  ctrlWrapper(updateTransactionController),
);

router.delete(
  '/:id',
  authenticate,
  validateParams(transactionIdParamSchema),
  ctrlWrapper(deleteTransactionController),
);

export default router;
