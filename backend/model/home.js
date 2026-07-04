const mongoose= require("mongoose")

const homeSchema= mongoose.Schema({
  title:{
    type:String,
    required:[true,"title is required"]
  },
  place:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  rating:{
    type:String,
    default :5
  },
  photo:String,
  description:String,
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  category:{
    type:String,
    required:true,
    enum:["Villa","Hotel", "Beach", "Pool", "Room", "Mountain"],
    default:"Villa"
  },
  lat:{
    type:String
  },
  long:{
    type:String
  }

})
module.exports=mongoose.model("Home",homeSchema)