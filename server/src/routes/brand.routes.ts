import express from "express";
import {
  getBrand,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controller/brand.controller";
import { authenticate } from "../middlewares/auth.middleware";
import multer from "multer";
import { All_Admins } from "../types/enum.types";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = "uploads/";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", authenticate(All_Admins), getBrand);
router.get("/user/:id", getBrandById);

//* .single use garyo bhani "req.file" ma file aauxa
//* .array use garyo bhani "req.files" ma files aauxa
router.post("/create", upload.single("logo"), createBrand);
router.patch("/update", updateBrand);
router.delete("/delete", deleteBrand);

export default router;
