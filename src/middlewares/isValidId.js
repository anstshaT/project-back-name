import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

// Може працювати з будь-яким ключем, наприклад: 'transactionId', 'userId'.

export const isValidId =
  (key = 'id') =>
  (req, res, next) => {
    const id = req.params[key];

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, `Invalid ${key}`));
    }

    next();
  };
