const User=require("../model/usermodel")
const Home=require("../model/home")
exports.geteditHome= async (req,res,next)=>{
try {
    const homeId = req.params.id;
    const loggedInHostId = req.user.userId;

    
    const home = await Home.findOne({ _id: homeId, owner: loggedInHostId });
    
    if (!home) {
      return res.status(404).json({ message: "Home not found or you are not owner of this house" });
    }
    
    return res.status(200).json({ home: home });
  } catch (err) {
    console.error("Error in geteditHome Backend:", err.message);
    return res.status(500).json({ message: "Error fetching home details", error: err.message });
  }
}
exports.posteditHome=(req,res,next)=>{
const homeId=req.params.id;
const loggedInHostId=req.user.userId;
const {title,place,price,rating,description,category,lat,long}=req.body;
Home.findOne({_id:homeId,owner:loggedInHostId}).then((home)=>{
  if(!home){
    return res.status(404).json({message:"Home not found or you are not owner of this house"});
  }
const photoPath = req.file ? req.file.path : home.photo;
home.title=title||home.title;
home.place =place|| home.place;
home.price=price||home.price;
home.photo=photoPath;
home.rating=rating||home.rating;
home.description=description||home.description;
home.category=category||home.category;
home.lat=lat||home.lat;
home.long=long||home.long;
;
 return home.save()
}).then(updatedResult=>{
return res.status(200).json({success:true,result:updatedResult,message:"suceesflly"})
})

.catch(err=>{
  res.status(500).json({ message: "Error updating home", error: err.message })
})

}

exports.postaddHome=(req,res,next)=>{
const {title,place,price,rating,description,category,lat,long}=req.body;
const photoPath = req.file ? req.file.path : "";
const home=new Home({title,place,price,rating,photo:photoPath,description,owner:req.user.userId,category,lat,long})
home.save().then((result)=>{
  res.status(201).json({result:result,message:"Home added sucesfully"})

})
}
exports.getMyHostHomes=(req,res,next)=>{
const loggedInHostId=req.user.userId
Home.find({owner:loggedInHostId}).then((myHomes)=>{
  res.status(200).json({registeredHomes:myHomes,message:"host homes sucessfully"})
}).catch(err=>{
  res.status(500).json({message:"erros finding Host Homes"})
})
}

exports.postDeleteHome= async (req,res,next)=>{
  try{
 const HomeId =req.params.id;
  const loggedInHostId=req.user.userId;
  console.log(HomeId)
 const deletedHome =await  Home.findOneAndDelete({ _id: HomeId, owner: loggedInHostId })
    if (!deletedHome) {
        return res.status(403).json({ 
          message: "Unauthorized! Aap kisi aur ka ghar delete nahi kar sakte ya ghar mila nahi." 
        });
      }
const updateResult = await User.updateMany({},{$pull:{favourites:HomeId}})
    return res.status(200).json({message:"sucesfully deleted"})
  
  }
  catch(err){
console.log("🔥 Error in postDeleteHome:",err);
    return res.status(500).json({ message: "does not delete home"});
  }
  
  
 

}