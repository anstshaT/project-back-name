import createHttpError from 'http-errors';
import {
  addTransactions,
  getTransactions,
  getTransactionsById,
} from '../../services/transactions/transactions.js';

export const getTransactionsController = async (req, res) => {
  const data = await getTransactions();

  res.json({
    status: 200,
    message: 'Successfully find transactions',
    data,
  });
};

export const getTransactionByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getTransactionsById(id);

  if (!data) {
    throw createHttpError(404, `Transaction with id =${id} not find`);
  }

  res.json({
    status: 200,
    message: `Successfully find transactions with id =${id}`,
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

  res.status(201).json({
    status: 201,
    messege: 'Successfully add transaction',
    data,
  });
};
