// Load environment variables
require('dotenv').config();

const express = require('express');
const app = express();

// Use environment variables
// const PORT = process.env.PORT || 3000;
const PORT = 4000
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware to log requests (only in development)
// if (NODE_ENV === 'development') {
//   const morgan = require('morgan'); // Use morgan for logging
//   app.use(morgan('dev'));
// }else{
//   console.log("ruing in prodiction mode")
// }

// Sample route
app.get('/', (req, res) => {
  res.send(`Hello, World! Running in ${NODE_ENV}.`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});
