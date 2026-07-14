// import { errorHandler } from "../middlewares/errorHandler.middleware";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";
// import { catchAsync } from "../utils/catchAsync.utils";
// import { sendResponse } from "../utils/sendResponse.utils";
// import { deleteFile, upload } from "../utils/cloudinary.utils";
import { sendEmail } from "../utils/emailServer.utils";
import {
  accountCreatedHtml,
  newLoginDetectedHtml,
} from "../utils/emailTemplate.utils";
// import { sendResponse } from "../utils/sendResponse.utils";
import ENV_CONFIG from "../config/env.config";
import { generateJwtToken } from "../utils/jwt.utils";
import { IJwtPayload } from "../types/global.types";
import { Role } from "../types/enum.types";

//* register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      throw Error("Full information required");
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      full_name,
      email,
      password: hashedPassword,
    });
    //* send account created email
    sendEmail({
      to: user.email,
      subject: "Account created",
      html: accountCreatedHtml({
        full_name: user.full_name,
        createdAt: new Date(Date.now()),
        email: user.email,
      }),
    });

    res.status(201).json({
      message: "Register success",
      status: "success",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

//* login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    const user = await User.findOne({ email }).select("+password");
    // const user = await User.findOne({ email }).select("-password"); //! to remove the password from query

    if (!user) {
      throw new Error("Credentials doesn't match");
    }
    const isPassMatched = await comparePassword(password, user.password);
    if (!isPassMatched) {
      throw new Error("Credentials does not match");
    }

    //todo: generate jwt token
    const payload: IJwtPayload = {
      _id: user._id,
      email: user.email,
      role: user.role as Role,
    };
    const access_token = generateJwtToken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "none",
    });
    console.log(access_token);
    // const { password: p } = user.toObject();
    //* send success response
    sendEmail({
      to: user.email,
      subject: "Login Detected",
      html: newLoginDetectedHtml({
        full_name: user.full_name,
        email: user.email,
        loginTime: new Date(Date.now()),
        device: req.headers["user-agent"]!!,
      }),
    });
  } catch (err) {
    next(err);
  }
};

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
