import express from "express";
import {
  getBrand,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controller/brand.controller";
import multer from "multer";
const router = express.Router();
const upload = multer();

router.get("/", getBrand);
router.get("/user/:id", getBrandById);
router.post("/create", upload.single("logo"), createBrand);
router.patch("/update", updateBrand);
router.delete("/delete", deleteBrand);

export default router;
