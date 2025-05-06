const User = require("../models/userModel")
const redisClient = require("../redis/redis")

const protect = async (req,res,next)=>{
    const sessionId = req.sessionID
    const sessionKey = `sess:${sessionId}`
    const sessionData = await redisClient.get(sessionKey)
    if(!sessionData){
        return res.status(404).json("session not found")
    }
    
    const parsed = JSON.parse(sessionData)
    if (!parsed.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
    req.user = parsed.user
    next()
}

module.exports = protect