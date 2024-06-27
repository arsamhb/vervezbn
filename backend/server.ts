import path from "path";
import express from "express";
import { logger } from "./src/middleware/loggers";
import cors from "cors";
import { errorHandler } from "./src/middleware/errorHandler";
import { corsOptions } from "./src/config/corsOptions";
import { verifyJWT } from "./src/middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { rootRouter } from "./src/routes/root";
import { refreshRouter } from "./src/routes/refresh";
import { sequelize, testDbConnection } from "./src/config/db";

import { registerRouter } from "./src/routes/register";
import { authRouter } from "./src/routes/auth";
import { logoutRouter } from "./src/routes/logout";

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

// DATABASE CONNECTION
sequelize;
testDbConnection();

// STATIC FILE SERVING MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// ROUTING BETWEEN ROUTES
app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);

app.use(verifyJWT);

app.use("/logout", logoutRouter);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
