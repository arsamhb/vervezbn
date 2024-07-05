import { logEvents } from "./loggers";
import { Request, Response } from "express";

export const errorHandler = (
  err: { name: string; message: string },
  req: Request,
  res: Response
) => {
  logEvents(`${err.name}: ${err.message}`, "errLogs.txt");
  res.status(500).send(err.message);
};
