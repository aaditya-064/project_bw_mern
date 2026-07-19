import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import brandRoutes from "./brand.routes";
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import cartRoutes from "./cart.routes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/brand", brandRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);

export default router;
