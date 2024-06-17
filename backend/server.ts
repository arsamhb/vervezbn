import path from "path";
import express from "express";
import { logger } from "@/middleware/loggers";
import cors from "cors";
import { errorHandler } from "@/middleware/errorHandler";
import { corsOptions } from "@/config/corsOptions";
import { verifyJWT } from "@/middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { router as rootRouter } from "@/routes/root";
import { router as registerRouter } from "@/routes/register";
import { router as authRouter } from "@/routes/auth";
import { router as refreshRouter } from "@/routes/refresh";
import { router as logoutRouter } from "@/routes/logout";
// import   from "./routes/subdir"
// import {router as logoutRouter}  from "./routes/api/users"

// import * as dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3500;

// CUSTOM LOGGER MIDDLEWARE
app.use(logger);

// CORS
app.use(cors(corsOptions));

// BUILT-IN MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// STATIC FILE SERVING MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// ROUTING BETWEEN ROUTES
app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);
// app.use("/subdir");

// PROTECTING API ROUTES BY THE VERIFY JWT MIDDLEWARE
app.use(verifyJWT);
// SAMPLE API
// app.use("/users");

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
