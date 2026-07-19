"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_utils_1 = require("../utils/bcrypt.utils");
// import { catchAsync } from "../utils/catchAsync.utils";
// import { sendResponse } from "../utils/sendResponse.utils";
// import { deleteFile, upload } from "../utils/cloudinary.utils";
const emailServer_utils_1 = require("../utils/emailServer.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
// import { sendResponse } from "../utils/sendResponse.utils";
const env_config_1 = __importDefault(require("../config/env.config"));
const jwt_utils_1 = require("../utils/jwt.utils");
const sendResponse_utils_1 = require("../utils/sendResponse.utils");
//* register
const register = async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;
        if (!full_name || !email || !password) {
            throw Error("Full information required");
        }
        const hashedPassword = await (0, bcrypt_utils_1.hashPassword)(password);
        const user = await user_model_1.default.create({
            full_name,
            email,
            password: hashedPassword,
        });
        //* send account created email
        (0, emailServer_utils_1.sendEmail)({
            to: user.email,
            subject: "Account created",
            html: (0, emailTemplate_utils_1.accountCreatedHtml)({
                full_name: user.full_name,
                createdAt: new Date(Date.now()),
                email: user.email,
            }),
        });
        (0, sendResponse_utils_1.sendResponse)(res, {
            message: "Registered Successfully",
            statusCode: 201,
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
//* login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }
        const user = await user_model_1.default.findOne({ email }).select("+password");
        // const user = await User.findOne({ email }).select("-password"); //! to remove the password from query
        if (!user) {
            throw new Error("Credentials doesn't match");
        }
        const isPassMatched = await (0, bcrypt_utils_1.comparePassword)(password, user.password);
        if (!isPassMatched) {
            throw new Error("Credentials does not match");
        }
        //todo: generate jwt token
        const payload = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        const access_token = (0, jwt_utils_1.generateJwtToken)(payload);
        res.cookie("access_token", access_token, {
            httpOnly: env_config_1.default.NODE_ENV === "development" ? false : true,
            secure: env_config_1.default.NODE_ENV === "development" ? false : true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: env_config_1.default.NODE_ENV === "development" ? "lax" : "none",
        });
        console.log(access_token);
        // const { password: p } = user.toObject();
        //* send success response
        (0, emailServer_utils_1.sendEmail)({
            to: user.email,
            subject: "Login Detected",
            html: (0, emailTemplate_utils_1.newLoginDetectedHtml)({
                full_name: user.full_name,
                email: user.email,
                loginTime: new Date(Date.now()),
                device: req.headers["user-agent"],
            }),
        });
        const { password: p, ...rest } = user.toObject();
        (0, sendResponse_utils_1.sendResponse)(res, {
            message: "Login success",
            statusCode: 201,
            data: {
                user: rest,
                access_token,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
//* logout
//* get profile
//* change profile image
// export const changeProfileImage = catchAsync(
//   async (req: Request, res: Response) => {
//     const { _id } = req.user;
//     const file = req.file;
//     if (!file) {
//       throw new Error("File Not Found");
//     }
//     const user = await User.find({ _id });
//     if (!user) {
//       throw new Error("User Not Found");
//     }
//     // await
//     //! delete old image
//     // if (user.profile_image && user.profile_image?.public_id) {
//     //   await deleteFile(user.profile_image.public_id);
//     // }
//     // const { path, public_id } = await upload(file, uploadFolder);
//     // user.profile_image = {
//     //   path,
//     //   public_id,
//     // };
//     sendResponse(res, {
//       message: "Profile updated",
//       statusCode: 200,
//       data: user,
//     });
//   },
// );
//* change password
//* forgot password
//* change email
