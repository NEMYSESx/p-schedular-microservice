import express from "express";
import { upload, uploadImageController } from "../controllers/upload-image";

const router = express.Router();

router.post("/uploadthing", upload.single("image"), uploadImageController);

export default router;
