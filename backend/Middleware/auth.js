const jwt =require("jsonwebtoken")
const verifyToken=(req,res,next)=>{
const token = req.cookies.token;
if(!token) return res.status(401).json({error:"Not authenticated",redirect:"/login"}
) 
jwt.verify(token,process.env.PASSWORD_,(err,decoded)=>{
  if(err) return res.status(401).json({error:"invalidtoken",redirect:"/login"})
    req.user=decoded
  next();
})

}
const verifyHost =(req,res,next)=>{
  if(req.user.userType!=="host") {
    return  res.status(403).json({ error:"only host alloowd"})
  }
  next();
}
const verifyGuest =(req,res,next)=>{
  if(req.user.userType!=="guest") {
    return  res.status(403).json({ error:"only guest alloowd"})
  }
  next();
}

const optionalAuth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return next()
  
  jwt.verify(token, process.env.PASSWORD_, (err, decoded) => {
    if (err) return next()
    req.user = decoded
    next()
  })
}
module.exports ={verifyToken,verifyHost,optionalAuth,verifyGuest}