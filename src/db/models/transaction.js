import mongoose from 'mongoose';
import { handlerSaveError } from './hooks.js';

const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    transactionType: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
      default: 'expense',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    summ: {
      type: Number,
      required: true,
      min: 0.01,
    },
    date: {
      type: String,
      required: true,
      default: () => new Date().toISOString().split('T')[0],
    },
    comment: {
      type: String,
      maxlength: 300,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

transactionSchema.post('save', handlerSaveError);

export const TransactionsCollection = model('transaction', transactionSchema);
