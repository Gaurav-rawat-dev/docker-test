// Load environment variables
require('dotenv').config();
const mongoose = require("mongoose");
const { RedisStore } = require("connect-redis")
const session = require("express-session")
const redisClient = require("./redis/redis")
const { PORT, MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, REDIS_HOST, REDIS_PORT, SESSION_SECRET } = require("./config/config")


const postRoutes = require("./routes/postroutes")
const userRoutes = require("./routes/userRoutes")


const express = require('express');
const app = express();
app.use(express.json())




const store = new RedisStore({
  client: redisClient,
  prefix: "sess:",
});
app.use(
  session({
    store: store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 30, // 30 seconds 
    },
  })
);



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
app.get('/api/v1', (req, res) => {
  res.send(`Hello, World! Running in ${NODE_ENV}. and now    `);
});

app.use("/api/v1/post", postRoutes)
app.use("/api/v1/user", userRoutes)


app.use("*", (req, res) => res.status(404).json({ error: "Route not found" }));
// Start the server
app.listen(PORT, () => {
  console.log(`Express Server is running on port ${PORT}`);
});

