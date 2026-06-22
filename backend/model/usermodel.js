const mongoose = require('mongoose')

const userSchema=mongoose.Schema({
  userName:{
    type:String,
    required:[true,"Name is required"]
  },
  lastName:{
    type:String
  },
  email:{
    type:String,
    unique:true,
    required:[true,"email is requird"]
  },
  password:{
    type:String,
    required:[true,"password is required"]
  },
  userType:{
    type:String,
    enum:["guest","host"],
    default : "guest"
  }
})
module.exports=mongoose.model("User",userSchema)