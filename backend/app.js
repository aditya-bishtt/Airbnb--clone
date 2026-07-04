const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./router/authRouter")
const storeRouter =require('./router/storeRouter')
const hostRouter=require('./router/hostRouter')
const cors =require("cors")
const app=express();
const cookieParser = require("cookie-parser")    
 const path =require("path")

const port=8080;
const DB_PATH="mongodb+srv://aditya:aditya@cluster1.mtfdigo.mongodb.net/newReactairbnb?appName=cluster1"
app.use(cors({
origin:"http://localhost:5173",
credentials:true
}
  
));

app.use(express.json())
app.use(cookieParser())  
app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use( authRouter)
app.use(storeRouter)
app.use("/host",hostRouter)

mongoose.connect(DB_PATH).then(()=>{
  console.log("Connected to mongodb ")
  app.listen(port,()=>{
    console.log("server start on 8080")
     console.log(`http://localhost:${port}`)
  })
})