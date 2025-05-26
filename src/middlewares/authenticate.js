/* import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/Session.js';
import UsersCollection from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    let session = null;

    const authHeader = req.headers.authorization || '';
    const sessionId = req.cookies.sessionId;

    if (authHeader.startsWith('Bearer ')) {
      const accessToken = authHeader.replace('Bearer ', '').trim();
      console.log('Access Token:', accessToken);

      session = await SessionCollection.findOne({ accessToken });
      console.log('Session by token:', session);
    } else if (sessionId) {
      session = await SessionCollection.findById(sessionId);
      console.log('Session by ID:', session);
    } else {
      throw createHttpError(401, 'No token or session ID provided');
    }

    if (!session) {
      throw createHttpError(401, 'Session not found');
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
  } catch (err) {
    next(err);
  }
}; */

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
