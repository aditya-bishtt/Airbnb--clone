require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./router/authRouter")
const storeRouter = require('./router/storeRouter')
const hostRouter = require('./router/hostRouter')
const cors = require("cors")
const cookieParser = require("cookie-parser")    
const path = require("path")

const app = express();


const port = process.env.PORT; 
const DB_PATH = process.env.MONGO_URI; 

app.use(cors({
  origin: [process.env.CLIENT_URL_LOCAL, process.env.CLIENT_URL_PROD],
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())  
app.use("/uploads", express.static(path.join(__dirname, "uploads")))


app.use("/api", authRouter)
app.use("/api", storeRouter)
app.use("/api/host", hostRouter)

mongoose.connect(DB_PATH).then(() => {
  console.log("Connected to mongodb ")
  app.listen(port, () => {
    console.log(`Server started successfully`)
    console.log("http://localhost:5173")
  })
}).catch(err => {
  console.error("Connection error:", err.message)
})