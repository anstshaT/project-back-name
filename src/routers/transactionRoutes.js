import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addTransactionsController,
  addUserIdToBody,
  getTransactionsController,
} from '../controllers/transactions/transactions.js';
import { tansactionAddSchema } from '../validation/tansaction/tansaction.js';
import { authenticate } from '../middlewares/authenticate.js';

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

export default transactionRouter;
