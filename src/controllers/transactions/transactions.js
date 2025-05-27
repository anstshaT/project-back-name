import createHttpError from 'http-errors';
import {
  addTransactions,
  getTransactions,
} from '../../services/transactions/transactions.js';
import { updateUserBalance } from '../../services/transactions/udateBalanse.js';

export const getTransactionsController = async (req, res) => {
  const userId = req.user._id;
  const transactions = await getTransactions(userId);

  const data = transactions.map((tx) => {
    const categoryName = tx.categoryId?.name || null;

    return {
      ...tx.toObject(),
      categories: categoryName,
    };
  });

  res.json({
    status: 200,
    message: 'Successfully find transactions',
    data,
  });
};

export const addUserIdToBody = (req, res, next) => {
  if (req.user && req.user._id) {
    if ('userId' in req.body) {
      delete req.body.userId;
    }
    req.body.userId = String(req.user._id);
  }
  next();
};

export const addTransactionsController = async (req, res) => {
  const data = await addTransactions(req.body);
  await updateUserBalance(req.body.userId);

  res.status(201).json({
    status: 201,
    messege: 'Successfully add transaction',
    data,
  });
};
