import { TransactionsCollection } from '../../db/models/transaction.js';
import UsersCollection from '../../db/models/User.js';

export const updateUserBalance = async (userId) => {
  const transactions = await TransactionsCollection.find({ userId });

  let income = 0;
  let expense = 0;
  for (const tx of transactions) {
    if (tx.transactionType === 'income') {
      income += tx.summ;
    } else if (tx.transactionType === 'expense') {
      expense += tx.summ;
    }
  }

  const newBalance = income - expense;

  await UsersCollection.findByIdAndUpdate(userId, { balance: newBalance });

  return newBalance;
};
