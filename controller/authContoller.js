const User = require("../models/userModel")

const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "User already exists" });


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
       

        //   // Save user
        const user = new User({ username, password: hashedPassword });
        await user.save();
        req.session.user = user

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        // Compare password
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            
            return res.status(401).json({ status: "fail", message: "Incorrect password" });
        }
        req.session.user = user
        
        // Successful login
        return res.status(200).json({ status: "success", message: "Login successful", user : req.session.user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }

}
exports.getUsers = async (req, res, next) => {

    try {
        
        const users = await User.find()
        res.status(200).json({
            status: "success",
            data: users
        })
    } catch (error) {
        console.log(error)
    }
}