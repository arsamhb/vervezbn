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
import { sequelize, testDbConnection } from "./src/config/db";
// import { User } from "./src/models/User";
import { Transaction } from "./src/models/Transaction";

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
Transaction.create({
  amount: 123123,
  user_id: "userID",
  status: "failed",
  bank: "blu",
  gateway: "zarrinpal",
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

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
