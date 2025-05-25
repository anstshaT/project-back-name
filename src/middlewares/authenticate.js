import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/Session.js';
import UsersCollection from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    let session = null;

    if (authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.replace('Bearer ', '').trim();
      console.log('Access Token:', accessToken);

      session = await SessionCollection.findOne({ accessToken });

      if (!session) {
        throw createHttpError(
          401,
          'Invalid or expired token (session not found)',
        );
      }

      if (session.accessTokenValidUntil < new Date()) {
        throw createHttpError(401, 'Access token expired');
      }

      const user = await UsersCollection.findById(session.userId).select(
        '-password',
      );

      if (!user) {
        throw createHttpError(401, 'User not found');
      }

      req.user = user;
      next();
    } else {
      throw createHttpError(401, 'No access token provided');
    }
  } catch (error) {
    next(error);
  }
};
