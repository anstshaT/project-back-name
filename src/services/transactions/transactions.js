import { TransactionsCollection } from '../../db/models/transaction.js';

export const getTransactions = () => TransactionsCollection.find();

export const getTransactionsById = (id) =>
  TransactionsCollection.findOne({ _id: id });

export const addTransactions = (payload) =>
  TransactionsCollection.create(payload);
