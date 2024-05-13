import { logEvents } from "../middleware/loggers";
export const errorHandler = (err:any, req:any, res:any, next:any) => {
  logEvents(`${err.name}: ${err.message}`, "errLogs.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};
