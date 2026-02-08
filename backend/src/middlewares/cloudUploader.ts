import type { RequestHandler } from 'express';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const cloudUploader: RequestHandler = async (req, res, next) => {
  console.log(req.file);

  try {
    //upload img
    const filePath = req.file!.filepath;
    const result = await cloudinary.uploader.upload(filePath);
    req.body.image = result.secure_url;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default cloudUploader;
