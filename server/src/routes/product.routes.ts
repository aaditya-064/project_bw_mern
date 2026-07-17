import { Router } from "express";
import { create, getAll, getById } from "../controller/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admins } from "../types/enum.types";
import { uploader } from "../middlewares/multer.middleware";

const router = Router();
const upload = uploader();

//* get all
router.get("/", getAll);

//* get by id
router.get("/:id", getById);

//* create

// {cover_image:[{}],images:[{},{},{}]}
router.post(
  "/",
  upload.fields([
    {
      name: "cover_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  authenticate(All_Admins),
  create,
);

export default router;
