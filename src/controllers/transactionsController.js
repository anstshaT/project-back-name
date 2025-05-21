import createHttpError from 'http-errors';
import { getSummaryByPeriod } from '../services/summary.js';

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
