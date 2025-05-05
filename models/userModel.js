const mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    username : {
        type : String,
        unique: true,
        require : [true, "username is required"]
    },
    password : {
        type : String,
        require : [true, "password is required"]
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User