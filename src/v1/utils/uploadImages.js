const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: async (req, file) => {
      return {
         folder: req.body.folder || "images_shared",
         format: file.mimetype.split("/")[1],
         public_id: file.originalname.split(".")[0],
         allowed_formats: ["jpg", "png", "jpeg", "svg", "webp", "gif", "tiff", "ico"],
      };
   },
});
const upload = multer({storage: storage});

module.exports = upload;
