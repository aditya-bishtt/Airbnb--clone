const User=require("../model/usermodel")
const {check,validationResult}=require("express-validator")
const jwt =require("jsonwebtoken")
const bcrypt  =require("bcryptjs")
exports.postSignup=[ 
  check('userName')
  .trim()
  .isLength({min:2})
  .withMessage("Atelast grater thean 2 character")
  .isAlpha()
  .withMessage("NAme ony on character"),

  check("lastName")
  .isAlpha()
  .withMessage("NAme ony on character"),

  check("email")
  .isEmail()  
  .withMessage("email Doestnot exit")
  .normalizeEmail(),
   
  check("password")
  .trim()
  .isLength({min:8})
  .withMessage("password greater than 8 character")
  .matches(/[a-z]/)
  .withMessage("Atleat one small case character")
  .matches(/[A-Z]/)
  .withMessage("Atleat one upper cse character")
  .matches(/[0-9]/)
  .withMessage("Atleast one number")
  .matches(/[!@#$%^&*]/)
  .withMessage("At least one special character required"),
  
  check("passwordConfirm")
  .trim()
  .custom((val,{req})=>{
    if(val!==req.body.password){
      throw new Error ("password does not match")
    }
      return true ;
  }
),
check("userType")
.notEmpty()
.withMessage(" please Select a usertype")
.isIn(["guest","host"])
.withMessage("Invalid Usertype"),


  
  
  ,(req,res,next)=>{
  
  console.log(" I am in Post Signup")
  const {userName,lastName,email,password,userType}=req.body
  const error= validationResult(req)
  if(!error.isEmpty()){
    return res.status(400).json({
      errors:error.array().map(err=>err.msg),
      oldInput:{userName,lastName,email,userType}
    })
  }
  bcrypt.hash(password,12).then(hashedPassword=>{
const user =new User({userName,lastName,email,password:hashedPassword,userType}) 
  user.save().then(()=>{
    console.log("save suceefully")
    res.json({message:"signUp"})
  }).catch(err=>{
    console.log(err)
    return res.status(422).json({
      errors:[err.message],
      oldInput:{userName,lastName,email,userType}
    })
  })
  })


  
}]


exports.postLogin= async (req,res,next)=>{
const {email,password} =req.body
const user= await User.findOne({email})
if(!user){
  return res.status(404).json({
      errors:["user not found"],
      oldInput:{email}
  })
}
const isMatch = await  bcrypt.compare(password,user.password)
if (!isMatch){
  return res.status(401).json({
    errors:["password does not match"],
    oldInput:{email}
  })
}

const token =jwt.sign(
  {userId:user._id,userType:user.userType},
  "Aditya@29623528512307",
  {expiresIn:"1h"}
)
res.status(200).cookie("token",token,{httpOnly: true,
    maxAge: 3600000}).json({ userId: user._id, userType: user.userType })
}