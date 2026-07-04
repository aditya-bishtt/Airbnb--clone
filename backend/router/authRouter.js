const express=require("express")
const authRouter= express.Router()
const authController= require("../controller/authController")
const {optionalAuth} =require("../Middleware/auth")
authRouter.get("/me", optionalAuth, (req, res) => {
  if (!req.user) return res.json({ user: null })
  res.json({ userId: req.user.userId, userType: req.user.userType })
})
authRouter.post("/signup",authController.postSignup)
authRouter.post("/login",authController.postLogin)
authRouter.post("/logout",authController.postLogout)
 module.exports=authRouter
