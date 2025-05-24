import Joi from 'joi';

export const tansactionAddSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .default(() => {
      return new Date().toISOString().split('T')[0];
    }),
  transactionType: Joi.string().required().valid('income', 'expense'),
  categoryId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  comment: Joi.string().max(192),
  summ: Joi.number().required().precision(2).min(0.01).max(1000000),
  userId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional(),
});
