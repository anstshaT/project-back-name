import { logoutUser } from '../services/auth/logoutUser.js';

export const logoutUserController = async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;

    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie('sessionId', {
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
      path: '/',
    });

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
      path: '/',
    });

    return res.status(204).send();
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Error while logging out.' });
  }
};
