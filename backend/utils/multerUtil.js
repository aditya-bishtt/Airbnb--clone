const multer=require("multer")
const cloudinary = require("../config/cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const randomString=(length)=>{
  const characters="abcdefghijklmnopqrstuvwxyz"
  let result=""
  for(let i=0;i<=length;i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "airbnb-clone",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => randomString(10),
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;