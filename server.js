const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const db = require('./config/db');

const app = express();

// middlewares 
app.use(morgan("dev"))
app.use(express.json())

dotenv.config();

// student routes
app.use('/api/v1/student', require('./routes/studentsRoutes'))

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>")
})

// Check database connection using Knex
db.raw('SELECT 1').then(() => {
  console.log(`Database connected successfully`);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});


