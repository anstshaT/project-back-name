import { THREE_DAY } from '../../constants/index.js';
import { loginUser } from '../../services/auth/loginUser.js';

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THREE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THREE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in',
    data: {
      accessToken: session.accessToken,
    },
  });
};
