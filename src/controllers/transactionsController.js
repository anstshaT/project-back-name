import createHttpError from 'http-errors';
import { getSummaryByPeriod } from '../services/summary.js';
import { TransactionsCollection } from '../db/models/transaction.js';
import { updateUserBalance } from '../services/transactions/udateBalanse.js';

export const getSummaryController = async (req, res, next) => {
  const { period } = req.params;

  if (!req.user || !req.user._id) {
    return next(createHttpError(401, 'Unauthorized: user not authenticated'));
  }

  const userId = req.user._id;

  try {
    const summary = await getSummaryByPeriod(userId, period);

    res.json({
      status: 200,
      message: `Successfully retrieved summary for period ${period}!`,
      income: summary.income,
      expense: summary.expense,
      totalIncome: summary.totalIncome,
      totalExpense: summary.totalExpense,
      balance: summary.balance,
    });
  } catch (error) {
    console.log(error);

    next(createHttpError(500, 'Server error'));
  }
};

export const addTransactionController = async (req, res, next) => {
  const { transactionType, categoryId, summ, date, comment } = req.body;

  if (!req.user || !req.user._id) {
    return next(createHttpError(401, 'Unauthorized: user not authenticated'));
  }

  const userId = req.user._id;

  try {
    const newTransaction = await TransactionsCollection.create({
      transactionType,
      categoryId,
      summ,
      date: date || new Date(),
      comment,
      userId,
    });

    await updateUserBalance(userId);

    res.status(201).json({
      status: 201,
      message: 'Transaction created successfully',
      transaction: newTransaction,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Server error'));
  }
};

export const updateTransactionController = async (req, res, next) => {
  const { id } = req.params;
  const { transactionType, categoryId, summ, date, comment } = req.body;

  if (!req.user || !req.user._id) {
    return next(createHttpError(401, 'Unauthorized: user not authenticated'));
  }

  const userId = req.user._id;

  try {
    const transaction = await TransactionsCollection.findOne({
      _id: id,
      userId,
    });
    if (!transaction) {
      return next(createHttpError(404, 'Transaction not found'));
    }
    const updatedFields = {};
    if (transactionType) updatedFields.transactionType = transactionType;
    if (categoryId) updatedFields.categoryId = categoryId;
    if (summ) updatedFields.summ = summ;
    if (date) updatedFields.date = date;
    if (comment) updatedFields.comment = comment;

    const updatedTransaction = await TransactionsCollection.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true },
    );

    if (!updatedTransaction) {
      return next(createHttpError(404, 'Transaction not found'));
    }

    await updateUserBalance(userId);

    res.json({
      status: 200,
      message: 'Transaction updated successfully',
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Server error'));
  }
};

export const deleteTransactionController = async (req, res, next) => {
  const { id } = req.params;

  if (!req.user || !req.user._id) {
    return next(createHttpError(401, 'Unauthorized: user not authenticated'));
  }

  const userId = req.user._id;

  try {
    const transaction = await TransactionsCollection.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!transaction) {
      return next(createHttpError(404, 'Transaction not found'));
    }

    await updateUserBalance(userId);

    res.json({
      status: 200,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, 'Server error'));
  }
};
