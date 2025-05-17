import express from 'express';
import authRouter from './routers/userRoutes.js';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./swagger/index.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

export default app;