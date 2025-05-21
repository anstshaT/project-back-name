import { registerUser } from '../../services/auth/registerService.js';
import { SessionCollection } from '../../db/models/Session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../../constants/index.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const session = await SessionCollection.create({
      userId: user.id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    });
  } catch (error) {
    if (error.message === 'Email already in use') {
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
};