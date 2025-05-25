import Joi from 'joi';
import mongoose from 'mongoose';

export const createTransactionSchema = Joi.object({
  transactionType: Joi.string().valid('income', 'expense').required(),
  categoryId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required()
    .messages({
      'any.invalid': 'Category ID must be a valid MongoDB ObjectId',
    }),
  summ: Joi.number().min(0.01).required(),
  date: Joi.date().iso(),
  comment: Joi.string().max(300),
});
