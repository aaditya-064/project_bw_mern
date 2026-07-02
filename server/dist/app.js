"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @types/packageName
//* creating app instances
const app = (0, express_1.default)();
//! using middlewares
//! using routes
//* health route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Server is up and running",
        success: true,
    });
});
//! path not found
exports.default = app;
