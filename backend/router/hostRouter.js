const express = require("express")
const {verifyToken,verifyHost} =require("../Middleware/auth")
const hostController =require("../controller/hostController")
const hostRouter = express.Router()
const upload=require("../utils/multerUtil")

hostRouter.post("/add-home", verifyToken,verifyHost,upload.single('photo'),hostController.postaddHome
)
hostRouter.get("/myhomes",verifyToken,verifyHost,hostController.getMyHostHomes)
hostRouter.get("/edit-home/:id",verifyToken,verifyHost,hostController.geteditHome)
hostRouter.post("/edit-home/:id", verifyToken,verifyHost,upload.single('photo'),hostController.posteditHome)
hostRouter.post("/delete-home/:id",verifyToken,verifyHost,hostController.postDeleteHome)

module.exports = hostRouter