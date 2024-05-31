import { logEvents } from "../middleware/loggers";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: { name: string; message: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(`${err.name}: ${err.message}`, "errLogs.txt");
  // console.error(err.stack);
  res.status(500).send(err.message);
};
