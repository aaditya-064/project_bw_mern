"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// @types/packageName
//* creating app instances
const app = (0, express_1.default)();
//! using middlewares
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//! using routes
app.use("/api/v1", routes_1.default);
//* health route
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Server is up and running",
        success: true,
    });
});
//! path not found
app.use((req, res, next) => {
    const message = `Can not ${req.method} on ${req.path}`;
    //   res.status(404).json({
    //     message,
    //     success: false,
    //     status: "fail",
    //     data: null,
    //   });
    const error = new Error(message);
    error.status = "fail";
    error.statusCode = 404;
    next(error);
});
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
