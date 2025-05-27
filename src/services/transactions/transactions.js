import { Category } from '../../db/models/Categories.js';
import { TransactionsCollection } from '../../db/models/transaction.js';

export const getTransactions = (userId) =>
  TransactionsCollection.find({ userId }).populate({
    path: 'categoryId',
    select: 'name _id type',
  });

export const addTransactions = async (payload) => {
  const categoryExists = await Category.exists({
    _id: payload.categoryId,
  });
  if (!categoryExists) {
    throw new Error('Category not found');
  }

  const newTransaction = await TransactionsCollection.create(payload);
  return await TransactionsCollection.findById(newTransaction._id).populate({
    path: 'categoryId',
    select: 'name _id type',
  });
};
