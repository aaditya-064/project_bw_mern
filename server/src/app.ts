import express, { NextFunction, Request, Response } from "express";
// @types/packageName

//* creating app instances
const app = express();

//! using middlewares

//! using routes

//* health route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Server is up and running",
    success: true,
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const message = `Can not ${req.method} on ${req.method}`;

  res.status(404).json({
    message,
    success: false,
    status: "fail",
    data: null,
  });
});

//! path not found

export default app;
