import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);
  const message = error?.message ?? "Internal server error";
  const status = error?.status ?? "Error";
  const statusCode = error?.statusCode ?? 500;
  const success = false;

  res.status(statusCode).json({
    message,
    status,
    success,
    data: null,
    details: error?.errors || null,
    originalError: error?.stack,
  });
};
