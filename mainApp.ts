import { Application, Request, Response } from "express";
import AuthRouter from "./router/AuthRouter";
export const mainApp = async (app: Application) => {
  try {
    app.use("/api", AuthRouter);
    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Welcome to my API", status: 200 });
    });
  } catch (error) {
    return error;
  }
};
