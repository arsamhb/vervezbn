import path from "path";
import express from "express";
import { logger } from "./src/middleware/loggers";
import cors from "cors";
import { errorHandler } from "./src/middleware/errorHandler";
import { corsOptions } from "./src/config/corsOptions";
import { verifyJWT } from "./src/middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { router as rootRouter } from "./src/routes/root";
import { router as registerRouter } from "./src/routes/register";
import { router as authRouter } from "./src/routes/auth";
import { router as refreshRouter } from "./src/routes/refresh";
import { router as logoutRouter } from "./src/routes/logout";
import { Sequelize } from "sequelize";

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

function connectToDb() {
  const sequelize = new Sequelize({
    host: "localhost",
    port: 5432,
    database: "verve",
    dialect: "postgres",
    username: "postgres",
    password: "arsamsql4",
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
      process.exit(1);
    });

  return sequelize;
}

const postGresClient = connectToDb();
console.log(postGresClient);

// STATIC FILE SERVING MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// ROUTING BETWEEN ROUTES
app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);

// PROTECTING API ROUTES BY THE VERIFY JWT MIDDLEWARE
app.use(verifyJWT);
// SAMPLE API
// app.use("/users");

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
