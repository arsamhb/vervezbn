import http from "http";
import path from "path";
import fs from "fs";
const fsPromises = require("fs").promises;

import { logEvents } from "./logger/loggerFunctions";
import EventEmitter from "events";
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

myEmitter.on("log", (message: string, filName: string) =>
  logEvents(message, filName)
);
const PORT = process.env.PORT || 3500;

const serveFile = async (
  filePath: string,
  contentType: string,
  response: any
) => {
  const encode: string = !contentType.includes("image") ? "utf8" : "";
  try {
    const rawData = await fsPromises.readFile(filePath, encode);
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err: any) {
    console.error(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const getContentType = (extension: string) => {
  switch (extension) {
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".jpg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".txt":
      return "text/plain";
    default:
      return "text/html";
  }
};

const createFilePath = (contentType: string, requestedUrl: string) => {
  let filePath =
    contentType === "text/html" && requestedUrl === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && requestedUrl.slice(-1) === "/"
      ? path.join(__dirname, "views", requestedUrl, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", requestedUrl)
      : path.join(__dirname, requestedUrl);

  return filePath;
};

const handleNotFoundFile = (filePath: string, response: any) => {
  switch (path.parse(filePath).base) {
    case "old-page.html":
      response.writeHead(301, { Location: "/new-page.html" });
      response.end();
      break;
    case "www-page.html":
      response.writeHead(301, { Location: "/" });
      response.end();
      break;
    default:
      serveFile(
        path.join(__dirname, "views", "404.html"),
        "text/html",
        response
      );
  }
};

const server = http.createServer((req: any, res: any) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  const extension: string = path.extname(req.url);
  const contentType: string = getContentType(extension);
  let filePath = createFilePath(contentType, req.url);

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const doesFileExists = fs.existsSync(filePath);

  if (doesFileExists) {
    serveFile(filePath, contentType, res);
  } else {
    handleNotFoundFile(filePath, res);
  }
});

server.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
