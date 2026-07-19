"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required"],
    },
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "Product ID is required"],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        default: 0,
        min: 1,
        max: 5,
    },
    text: {
        type: String,
        trim: true,
        minLength: 5,
        maxLength: 500,
    },
}, { timestamps: true });
const Review = mongoose_1.default.model("review", reviewSchema);
exports.default = Review;
