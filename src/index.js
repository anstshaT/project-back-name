import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './server.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
  })
  .catch(error => {
    console.error('❌ DB connection error:', error.message);
    process.exit(1);
  });