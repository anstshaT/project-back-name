import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrentUser } from '../controllers/user/userController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserController } from '../controllers/user/updateUserController.js';
import { updateUserSchema } from '../validation/user/updateUser.js';

const userRouter = Router();

userRouter.get('/me', authenticate, getCurrentUser);
userRouter.patch(
  '/user/update/:userId',
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default userRouter;
