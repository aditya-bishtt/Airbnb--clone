const Home=require("../model/home")
const User =require("../model/usermodel")
const Booking =require("../model/booking")
exports.getHome=  (req,res,next)=>{
  console.log("I am in Home List");
   Home.find().sort({createdAt:-1}).then((registeredHomes)=>{
    console.log(registeredHomes)
    res.status(200).json({registeredHomes})
   }).catch(err=>{
    console.log(err);
    res.status(500).json({message:"error in fetxhing home in datatbase"})
   })


}
exports.getHomeDetails =(req,res,next)=>{
  const Id=req.params.id;
  Home.findById(Id).then(home=>{
    console.log(home)
    res.status(200).json({home})

  }).catch(err=>{
console.log(err)
    res.status(500).json({message:"Home details not fetch"})
  }
  )
}
exports.postAddToFavourites= async (req,res,next)=>{
  try{
const Id  =req.user.userId;
const HomeId=req.params.id;
const user= await User.findById(Id)
if(!user){
  return res.status(404).json({message:"usern not found"})
}
if(!user.favourites.includes(HomeId)){
user.favourites.push(HomeId);
 await user.save()
}
return res.status(200).json({message :"added  sucesfully"})
  }
  catch(err){
console.log(err.message);
return res.status(500).json({message :"error in adding the favourite"})
  }

}

exports.getfavouriteList=(req,res,next)=>{
  const Id  =req.user.userId;
  User.findById(Id).populate("favourites").then(user=>{
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

    return res.status(200).json({sucess:true,favHome:user.favourites})
  }).catch(err=>{
    return  res.status(500).json({message:"finding favouriteList error"})
  })

}
exports.postRemoveFromFavourite= async (req,res,next)=>{
  const HomeId=req.params.id;
  const userId=req.user.userId;
 const updatedUser=await  User.findByIdAndUpdate(userId,{$pull:{favourites:HomeId}},{new:true}).populate("favourites")


if(!updatedUser){
  return res.status(404).json({message:"user nhi mila"})
}
 return res.status(200).json({ 
      success: true, 
      message: "Removed successfully",
      favHome: updatedUser.favourites 
    });
}

const isDataClashing=async (homeId,newCheckIn,newCheckOut)=>{
  const existingBookings= await Booking.find({home:homeId})
  if(!existingBookings){
    return false;
  }
  const clash = existingBookings.some(booking=>{
    return newCheckIn<booking.checkOut&&newCheckOut>booking.checkIn;
    
  })
return clash;
}

exports.postBooking=async (req,res,next)=>{
try{
  const {homeId,checkIn,checkOut,guests}=req.body;
  const userId=req.user.userId;
  const home=await  Home.findById(homeId);
  if(!home){
    return res.status(404).json({message:"home not found"});
  }
  const newCheckIn = new Date(checkIn);
const newCheckOut = new Date(checkOut);

   if (newCheckIn >= newCheckOut) {
      return res.status(400).json({ message: "Check-out date check-in ke baad honi chahiye" });
    }

    const hashClash= await isDataClashing(homeId,newCheckIn,newCheckOut);
    if(hashClash){
       return res.status(409).json({ message: "Ye home in dates me pehle se book hai" });
    }
    const oneDayMs = 1000 * 60 * 60 * 24;
    const nights = Math.round((newCheckOut - newCheckIn) / oneDayMs);
    const pricePerNight = Number(home.price);
const totalPrice = nights * pricePerNight;

    const newBooking= new Booking({
      home:homeId,
      user:userId,
      checkIn:newCheckIn,
      checkOut:newCheckOut,
       guests,
      totalPrice
    })
    await newBooking.save();
     return res.status(201).json({ message: "Booking successful", booking: newBooking });

}
catch(err){
  console.log(err);
  return res.status(500).json({ message: "Something went wrong while creating booking" })
}

}

exports.getBookings=async(req,res,next)=>{
  try{
  const userId=req.user.userId;
  const booking= await Booking.find({user:userId}).populate("home")
  if(!booking){
    res.status(404).json({message:"Booking not found"})
  }
  return res.status(200).json({bookings:booking,message:"sucess"})
  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"server error"})
  }
}
exports.DeleteBooking= async(req,res,next)=>{
  try{
     const userId=req.user.userId;
     const bookingId=req.params.id;
     const isBooking= await Booking.findOne({user:userId,_id:bookingId});
      if (!isBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
     await Booking.findByIdAndDelete(bookingId);
     return res.status(200).json({ message: "Booking cancelled successfully" })
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}