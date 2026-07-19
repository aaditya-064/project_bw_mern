import express from "express";
import { addQuantity, create } from "../controller/cart.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admins } from "../types/enum.types";
const router = express.Router();

// router.get("/", authenticate(All_Admins), getBrand);
// router.get("/user/:id", );

//* .single use garyo bhani "req.file" ma file aauxa
//* .array use garyo bhani "req.files" ma files aauxa
router.post("/", authenticate(All_Admins), create);
router.post("/add-quantity", authenticate(All_Admins), addQuantity);
// router.patch("/update", updateBrand);
// router.delete("/delete", deleteBrand);

export default router;
