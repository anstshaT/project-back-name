import createHttpError from 'http-errors';
import UsersCollection from '../../db/models/User.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { SessionCollection } from '../../db/models/Session.js';
import { ONE_DAY, THREE_DAY } from '../../constants/index.js';

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Password is incorrect');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_DAY),
    refreshTokenValidUntil: new Date(Date.now() + THREE_DAY),
  });
};
