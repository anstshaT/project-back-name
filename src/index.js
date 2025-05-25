import { initMongoDB } from './db/initMongoDB.js';
import { initializeCategories } from './db/initializeCategories.js';
import { setupServer } from './server.js';
import { getEnvVar } from './utils/getEnvVar.js';
import 'dotenv/config';



const bootstrap = async () => {
  await initMongoDB();

  try {
    await initializeCategories();
  } catch (error) {
    console.error('Failed to initialize categories:', error.message);
  };

  const app = setupServer();
  const port = Number(getEnvVar("PORT", 3000));
  app.listen(port, ()=> console.log(`Server running on ${port} port`));

};


bootstrap();
