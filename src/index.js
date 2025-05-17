import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';
import { getEnvVar } from './utils/getEnvVar.js';
import 'dotenv/config';



const bootstrap = async () => {
  await initMongoDB();
  const app = setupServer();
  const port = Number(getEnvVar("PORT", 3000));
  app.listen(port, ()=> console.log(`Server running on ${port} port`));

};


bootstrap();
