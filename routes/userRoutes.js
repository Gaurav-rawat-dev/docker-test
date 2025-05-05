const express = require("express")
const authcontoller = require("../controller/authContoller")
const router = express.Router()



router
    .route("/signup")
    .post(authcontoller.signup )


    router.route("/login").post(authcontoller.login)

    router
    .route("/")
    .get(authcontoller.getUsers)


    module.exports = router