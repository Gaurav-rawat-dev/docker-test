module.exports = {
    MONGO_IP : process.env.MONGO_IP  || "mongo",
    MONGO_PORT : process.env.MONGO_PORT  || 27017,
    MONGO_USER : process.env.MONGO_USER,
    MONGO_PASSWORD : process.env.MONGO_PASSWORD,
    PORT : 3000,
    REDIS_HOST :  process.env.REDI_HOST || "redis",
    REDIS_PORT :  process.env.REDI_PORT || "6379",
    SESSION_SECRET : "mysecret"
}