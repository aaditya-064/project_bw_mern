import express from "express";
import {
  getAllUser,
  getProfile,
  getAllAdmin,
} from "../controller/user.controller";
const router = express.Router();

router.get("/", getAllUser);
router.get("/user/:id", getProfile);
router.get("/admins", getAllAdmin);

export default router;
