import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./middlewares/errorHandler.middleware";
// @types/packageName

//* creating app instances
const app = express();

//! using middlewares
app.use(express.json({ limit: "10mb" }));

//! using routes

//* health route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Server is up and running",
    success: true,
  });
});

//! path not found
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method} on ${req.path}`;

  //   res.status(404).json({
  //     message,
  //     success: false,
  //     status: "fail",
  //     data: null,
  //   });
  const error: any = new Error(message);
  error.status = "fail";
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

export default app;
