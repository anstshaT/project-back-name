import createHttpError from 'http-errors';
import { updateUser } from '../../services/user/updateUser.js';

export const updateUserController = async (req, res, next) => {
  const { userId } = req.params;
  console.log('User new info', req.body);

  const result = await updateUser(userId, { ...req.body });

  if (!result) {
    next(createHttpError(404, 'User not found for update info'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a user',
    data: result,
  });
};
