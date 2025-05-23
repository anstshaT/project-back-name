import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addTransactionsController,
  addUserIdToBody,
  getTransactionByIdController,
  getTransactionsController,
} from '../controllers/transactions/transactions.js';
import { tansactionAddSchema } from '../validation/tansaction/tansaction.js';

const transactionRouter = Router();

transactionRouter.get('/', ctrlWrapper(getTransactionsController));

transactionRouter.get('/:id', ctrlWrapper(getTransactionByIdController));

transactionRouter.post(
  '/',
  addUserIdToBody,
  validateBody(tansactionAddSchema),
  ctrlWrapper(addTransactionsController),
);

export default transactionRouter;
