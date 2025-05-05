// Load environment variables
require('dotenv').config();
const mongoose = require("mongoose");
const { PORT, MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } = require("./config/config")


const postRoutes = require("./routes/postroutes")


const express = require('express');
const app = express();
app.use(express.json())

const mongoURI = process.env.MONGO_URI || `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydatabase?authSource=admin`;

const ConnectWithRetry = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("MongoDB Connection Error:", err)
      setTimeout(ConnectWithRetry, 5000)
    });


}

ConnectWithRetry()


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

app.use("/api/v1/post", postRoutes)

// Start the server
app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});

