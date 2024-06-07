import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import studentRoutes from './routes/studentsRoutes.js'
import db from './config/db.js';

const app = express();

// middlewares 
app.use(morgan("dev"))
app.use(express.json())

// configuration
dotenv.config();

// student routes
app.use('/api/v1/student', studentRoutes)

const PORT = process.env.PORT || 4000;

// Check database connection using Knex
db.raw('SELECT 1').then(() => {
  console.log(`Database connected successfully`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});


