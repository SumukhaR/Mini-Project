const CustomError = require("../../helpers/error/CustomError")
const User = require("../../models/user")
const jwt = require("jsonwebtoken")
const asyncErrorWrapper = require("express-async-handler")
const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/auth/tokenHelper")

const getAccessToRoute = asyncErrorWrapper(async(req, res,next) => {

    const { JWT_SECRET_KEY } = process.env

    if(!isTokenIncluded(req)){
        console.log(req.headers)
        return next(new CustomError("You are not authorized to access this route", 401))
    }

    const accessToken = getAccessTokenFromHeader(req)

    const decoded = jwt.verify(accessToken, JWT_SECRET_KEY)

    const user = await User.findById(decoded.id)

    if(!user){
        return next(new CustomError("You are not authorized to access this route", 401))
    }
    //console.log("authorized user")
    req.user = user
    //console.log(req.user)
    next()
})

module.exports = { getAccessToRoute }