// Load environment variables
require('dotenv').config();
const mongoose = require("mongoose");
const {PORT, MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER}  = require("./config/config")


const express = require('express');
const app = express();

const mongoURI = process.env.MONGO_URI || `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydatabase?authSource=admin`;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));



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
  res.send(`Hello, World! Running in ${NODE_ENV}. and now    `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});

