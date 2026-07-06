// import { errorHandler } from "../middlewares/errorHandler.middleware";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils";

//* register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw Error("Full information required");
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({
      message: "Register success",
      status: "success",
      success: true,
      data: user,
    });
    next();
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

    //* send success response
    res.status(201).json({
      message: "Login success",
      status: "success",
      success: true,
      data: user,
    });
    next();
  } catch (err) {
    next(err);
  }
};

//* change password

//* forgot password

//* change email
