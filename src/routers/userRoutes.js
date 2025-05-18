import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/auth/validateBody.js';
import { updateUserController } from '../controllers/user/userController.js';
import { updateUserSchema} from '../validation/user/updateUser.js';

const userRouter = Router();

userRouter.patch('/user/:userId', validateBody(updateUserSchema), ctrlWrapper(updateUserController));

export default userRouter;