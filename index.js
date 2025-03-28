// Load environment variables
const mongoose = require("mongoose");
require('dotenv').config();

const express = require('express');
const app = express();




const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));



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
  res.send(`Hello, World! Running in ${NODE_ENV}. and now    `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});
