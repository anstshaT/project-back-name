import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/Session.js';
import UsersCollection from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    let session;

    // Спроба взяти sessionId з cookie
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      session = await SessionCollection.findById(sessionId);
    } else {
      // Якщо cookie немає — пробуємо з Authorization Bearer
      const authHeader = req.headers.authorization || '';
      if (!authHeader.startsWith('Bearer ')) {
        throw createHttpError(401, 'No session ID or Authorization header');
      }
      const accessToken = authHeader.replace('Bearer ', '').trim();

      session = await SessionCollection.findOne({ accessToken });
    }

    if (!session || session.accessTokenValidUntil < new Date()) {
      throw createHttpError(401, 'Invalid or expired session or token');
    }

    const user = await UsersCollection.findById(session.userId).select(
      '-password',
    );
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
