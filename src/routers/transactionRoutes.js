import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  updateTransactionController,
  deleteTransactionController,
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

const transactionRouter = Router();

transactionRouter.get(
  '/',
  authenticate,
  ctrlWrapper(getTransactionsController),
);

transactionRouter.post(
  '/',
  authenticate,
  addUserIdToBody,
  validateBody(tansactionAddSchema),
  ctrlWrapper(addTransactionsController),
);

transactionRouter.patch(
  '/:id',
  authenticate,
  validateParams(transactionIdParamSchema),
  validateBody(updateTransactionSchema),
  ctrlWrapper(updateTransactionController),
);

transactionRouter.delete(
  '/:id',
  authenticate,
  validateParams(transactionIdParamSchema),
  ctrlWrapper(deleteTransactionController),
);

export default transactionRouter;
