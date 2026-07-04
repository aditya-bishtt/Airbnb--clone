const express=require("express")
const storeRouter=express.Router()
const {verifyToken,verifyGuest} =require("../Middleware/auth")
// const {verifyToken,verifyHost} =require("../Middleware/auth")
const storeController=require("../controller/storeController")
storeRouter.get("/",storeController.getHome)
storeRouter.get("/details/:id",storeController.getHomeDetails)
storeRouter.post("/favourites/:id",verifyToken,verifyGuest,storeController.postAddToFavourites)
storeRouter.get("/favourites",verifyToken,verifyGuest,storeController.getfavouriteList)
storeRouter.post("/remove-favourites/:id",verifyToken,verifyGuest,storeController.postRemoveFromFavourite)
storeRouter.post("/addbookings",verifyToken,storeController.postBooking)
storeRouter.get("/mybookings",verifyToken,storeController.getBookings)
storeRouter.delete("/deleteBooking/:id",verifyToken,storeController.DeleteBooking)


module.exports=storeRouter
