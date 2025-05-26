import Joi from 'joi';
import mongoose from 'mongoose';

const validateObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const transactionIdParamSchema = Joi.object({
  id: Joi.string().custom(validateObjectId, 'valid MongoDB id').required(),
});
