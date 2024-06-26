const express = require("express")

const { register, login, resetpassword, forgotPassword, getPrivateData } = require("../controllers/authController")

const { getAccessToRoute } = require("../middlewares/authorization/auth")

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.post("/forgotpassword", forgotPassword)

router.post("/resetpassword", resetpassword)

router.get("/private", getAccessToRoute, getPrivateData)

module.exports = router