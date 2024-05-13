import { v4 as uuid } from "uuid";
import { format } from "date-fns";

import fs from "fs";
import path from "path";
const fsPromises = require("fs").promises;

export const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logDirPath = path.join(__dirname, "..", "logs");

  try {
    if (!fs.existsSync(logDirPath)) {
      await fsPromises.mkdir(logDirPath);
    }

    await fsPromises.appendFile(path.join(logDirPath, logName), logItem);
  } catch (err) {
    console.error(err);
  }
};

export const logger = async (req: any, res: any, next: any) => {
  logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, "reqLog.txt");
  next();
};
