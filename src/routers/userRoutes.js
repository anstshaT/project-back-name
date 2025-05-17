import express from 'express';
import { registerController } from '../controllers/auth/registerController.js';
import { registerValidateBody } from '../middlewares/registerValidateBody.js';

const router = express.Router();

router.post('/register', registerValidateBody, registerController);

export default router;