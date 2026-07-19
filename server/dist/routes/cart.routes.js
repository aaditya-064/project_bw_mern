"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controller/cart.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enum_types_1 = require("../types/enum.types");
const router = express_1.default.Router();
// router.get("/", authenticate(All_Admins), getBrand);
// router.get("/user/:id", );
//* .single use garyo bhani "req.file" ma file aauxa
//* .array use garyo bhani "req.files" ma files aauxa
router.post("/", (0, auth_middleware_1.authenticate)(enum_types_1.All_Admins), cart_controller_1.create);
router.post("/add-quantity", (0, auth_middleware_1.authenticate)(enum_types_1.All_Admins), cart_controller_1.addQuantity);
// router.patch("/update", updateBrand);
// router.delete("/delete", deleteBrand);
exports.default = router;
