"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_controller_1 = require("../controller/brand.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_1 = __importDefault(require("multer"));
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const folder = "uploads/";
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.get("/", (0, auth_middleware_1.authenticate)(enum_types_1.All_Admins), brand_controller_1.getBrand);
router.get("/user/:id", brand_controller_1.getBrandById);
//* .single use garyo bhani "req.file" ma file aauxa
//* .array use garyo bhani "req.files" ma files aauxa
router.post("/create", upload.single("logo"), brand_controller_1.createBrand);
router.patch("/update", brand_controller_1.updateBrand);
router.delete("/delete", brand_controller_1.deleteBrand);
exports.default = router;
