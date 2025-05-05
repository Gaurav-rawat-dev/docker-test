const Post = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            data: posts
        })
    } catch (error) {
        res.send("error fetching data")
    }
}

exports.getOPnePost = async (req, res, nmext) => {
    try {
        const posts = await Post.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: posts
        })
    } catch (error) {
        res.send("error fetching data")
    }
}


exports.createPost =  async (req, res, nmext) => {
    try {
        const posts = await Post.create(req.body)
        res.status(200).json({
            status: "post created",
            data: posts
        })
    } catch (error) {
        res.send("error fetching data")
    }
}

exports.updatePost =  async (req, res, nmext) => {
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators : true
        })
        res.status(200).json({
            status: "post updated",
            data: posts
        })
    } catch (error) {
        res.send("error fetching data")
    }
}


exports.deletePost =  async (req, res, nmext) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "post deleted"
        })
    } catch (error) {
        res.send("error fetching data")
    }
}
