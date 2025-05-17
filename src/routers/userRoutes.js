import { Router } from 'express';
import { getUserByIdController } from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { updateUserController } from '../controllers/user/updateUserController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema } from '../validation/user/updateUser.js';

const userRouter = Router();

userRouter.get('/user/:userLoginId', ctrlWrapper(getUserByIdController));

userRouter.patch(
  '/user/:userId',
  ctrlWrapper(updateUserController),
  validateBody(updateUserSchema),
);

export default userRouter;
