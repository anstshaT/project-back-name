import createHttpError from 'http-errors';

export const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad request', {
      errors: err.details,
    });
    next(error);
  }
};
