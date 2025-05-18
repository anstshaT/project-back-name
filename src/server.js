import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();
  app.use(cookieParser());

  app.use(cors());
  app.use(express.json());
  app.use(logger);

  app.get('/auth');

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
