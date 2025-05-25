import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getSummaryController,
  updateTransactionController,
  deleteTransactionController,
  addTransactionController,
} from '../controllers/transactionsController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateParams } from '../middlewares/validateParams.js';
import { transactionIdParamSchema } from '../validation/transaction/transactionIdParam.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateTransactionSchema } from '../validation/transaction/updateTransaction.js';
import { tansactionAddSchema } from '../validation/tansaction/tansaction.js';
import {
  addTransactionsController,
  addUserIdToBody,
  getTransactionsController,
} from '../controllers/transactions/transactions.js';
import { tansactionAddSchema } from '../validation/tansaction/tansaction.js';

const router = express.Router();
const transactionRouter = Router();

router.get('/summary/:period', authenticate, getSummaryController);

transactionRouter.get(
  '/',
  authenticate,
  ctrlWrapper(getTransactionsController),
);

router.post(
  '/',
  authenticate,
  validateBody(updateTransactionSchema),
  ctrlWrapper(addTransactionController),
);

transactionRouter.post(
  '/',
  authenticate,
  addUserIdToBody,
  validateBody(tansactionAddSchema),
  ctrlWrapper(addTransactionsController),
);

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

export default transactionRouter;