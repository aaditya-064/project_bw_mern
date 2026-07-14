import { Request, Response, NextFunction } from "express";
import { Role } from "../types/enum.types";
import { verifyJwtToken } from "../utils/jwt.utils";
// import mongoose from "mongoose";

export const authenticate = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;
      console.log(cookies);
      const access_token = cookies["access_token"];
      console.log(access_token);
      if (!access_token) {
        throw new Error("Unauthroized Login");
      }
      const decoded_data = verifyJwtToken(access_token);
      console.log(decoded_data);
      //   const decoded_data = {
      //     _id: 123,
      //     email: "ram@gmail.com",
      //     role: Role.USER,
      //     iat: 1782198123,
      //     exp: 1712912309,
      //   };
      if (!decoded_data) {
        throw new Error("Invalid Token. Login Required");
      }
      // if (decoded_data.exp * 1000 <= Date.now()) {
      //   res.clearCookie("access_token", {}); //! watch video and complete this
      //   throw new Error("Token Expired");
      // }
      // if (roles && roles.length > 0 && !roles.includes(decoded_data.role)) {
      //   throw new Error("Forbidden. Access denied.");
      // }
      // //   req.user = decoded_data;
      // req.user = {
      //   _id: new mongoose.Types.ObjectId(decoded_data._id),
      //   email: decoded_data.email,
      //   role: decoded_data.role,
      // };
      next();
    } catch (err) {
      next(err);
    }
  };
};
