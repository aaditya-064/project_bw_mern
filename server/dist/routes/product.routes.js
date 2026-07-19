"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controller/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const router = (0, express_1.Router)();
const upload = (0, multer_middleware_1.uploader)();
//* get all
router.get("/", product_controller_1.getAll);
//* get by id
router.get("/:id", product_controller_1.getById);
//* create
// {cover_image:[{}],images:[{},{},{}]}
router.post("/", upload.fields([
    {
        name: "cover_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    },
]), (0, auth_middleware_1.authenticate)(enum_types_1.All_Admins), product_controller_1.create);
exports.default = router;
