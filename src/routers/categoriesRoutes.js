import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { categoriesController } from '../controllers/categories/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/', ctrlWrapper(categoriesController));

export default categoriesRouter;