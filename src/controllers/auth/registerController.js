import { registerUser } from '../../services/auth/registerService.js';

export const registerController = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    if (error.message === 'Email already in use') {
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
};