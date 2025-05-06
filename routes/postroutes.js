const express = require("express")
const postController = require("../controller/postController")
const protect = require("../middlewares/protect")
const router = express.Router()

router
    .route("/")
    .get(postController.getAllPosts)
    .post(protect,postController.createPost)

router
    .route("/:id")
    .get(postController.getOPnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost)

module.exports = router