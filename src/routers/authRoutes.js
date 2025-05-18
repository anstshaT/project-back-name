import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth/registerValidation.js';
import { registerController } from '../controllers/auth/registerController.js';
import { validateBody } from '../middlewares/auth/validateBody.js';
import { loginUserSchema} from '../validation/auth/loginUser.js';
import { loginUserController } from '../controllers/auth/loginUserController.js';
import { logoutUserController } from '../controllers/auth/logoutUserController.js';



const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;