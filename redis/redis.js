const { createClient } = require("redis")
const {REDIS_HOST, REDIS_PORT} = require("../config/config")

const redisClient = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
});

(async () => {
    try {
      await redisClient.connect(); // Must connect before using .get()
      console.log('Redis client connected');
    } catch (err) {
      console.error('Redis connection error:', err);
    }
  })();



module.exports = redisClient
