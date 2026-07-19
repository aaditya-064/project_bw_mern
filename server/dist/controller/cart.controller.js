"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuantity = exports.create = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
// import User from "../models/user.model";
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { user, items } = req.body;
    const existingCart = await cart_model_1.default.findOne({ user });
    if (existingCart) {
        existingCart.items = items;
        await existingCart.save();
        return (0, sendResponse_utils_1.sendResponse)(res, {
            message: "Cart updated successfully",
            statusCode: 200,
            data: {
                cart: existingCart,
            },
        });
    }
    const cart = await cart_model_1.default.create({ user, items });
    (0, sendResponse_utils_1.sendResponse)(res, {
        message: "Cart created successfully",
        statusCode: 201,
        data: {
            cart,
        },
    });
});
exports.addQuantity = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { user, productId, quantity } = req.body;
    const cart = await cart_model_1.default.findOne({ user });
    if (!cart) {
        return (0, sendResponse_utils_1.sendResponse)(res, {
            message: "Cart not found",
            statusCode: 404,
            data: null,
        });
    }
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    }
    else {
        cart.items.push({ product: productId, quantity });
    }
});
