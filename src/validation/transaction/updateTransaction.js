import Joi from 'joi';
import mongoose from 'mongoose';

const validateObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const updateTransactionSchema = Joi.object({
  transactionType: Joi.string().valid('income', 'expense'),
  categoryId: Joi.string().custom(validateObjectId, 'valid MongoDB id'),
  summ: Joi.number().min(0),
  date: Joi.date(),
  comment: Joi.string().max(27).allow('', null),
});
