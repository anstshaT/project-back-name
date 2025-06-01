import Joi from 'joi';

const domains = ['.com', '.net', '.org'];

export const registerValidationSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(64)
    .required()
    .custom((value, helpers) => {
      if (!domains.some((domain) => value.endsWith(domain))) {
        return helpers.error('any.invalid', {
          message: `The domain must be one of: ${domains.join(', ')}`,
        });
      }
      return value;
    }, 'Checking allowed domains'),
  password: Joi.string().min(8).max(64).required(),
});
