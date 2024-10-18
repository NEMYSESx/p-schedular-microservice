import { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { storageProducer } from "../utils/kafka";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImageController = (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded." });
  }

  const stream = cloudinary.uploader.upload_stream((error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Upload failed", error: error });
    }
    if (result) {
      res.status(200).json({ success: true, url: result.secure_url });
      storageProducer({ imgurl: result.secure_url });
    } else {
      res.status(500).json({
        success: false,
        message: "Upload failed",
        error: "No result returned from cloudinary",
      });
    }
  });

  stream.end(req.file.buffer);
};

export { uploadImageController, upload };
