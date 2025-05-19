import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerValidationSchema } from '../validation/auth/registerValidation.js';
import { registerController } from '../controllers/auth/registerController.js';
import { validateBody } from '../middlewares/auth/validateBody.js';
import { loginUserSchema} from '../validation/auth/loginUser.js';
import { loginUserController } from '../controllers/auth/loginUserController.js';
import { refreshUserSessionController } from '../controllers/auth/refreshUserSessionController.js';
import { logoutUserController } from '../controllers/auth/logoutUserController.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerValidationSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh-session', refreshUserSessionController);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default authRouter;