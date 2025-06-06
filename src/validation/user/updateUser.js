import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32),
});
