const express = require("express")
const authcontoller = require("../controller/authContoller")
const protect = require("../middlewares/protect")

const router = express.Router()



router
    .route("/signup")
    .post(authcontoller.signup )


    router.route("/login").post(authcontoller.login)

    router
    .route("/")
    .get(protect, authcontoller.getUsers)


    module.exports = router