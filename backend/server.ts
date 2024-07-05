import "module-alias/register";
import express from "express";
import { logger } from "./src/middleware/loggers";
import cors from "cors";
import { errorHandler } from "./src/middleware/errorHandler";
import { corsOptions } from "./src/config/corsOptions";
import { verifyJWT } from "./src/middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { sequelize, testDbConnection } from "./src/config/db";
import {
  refreshRouter,
  registerRouter,
  authRouter,
  logoutRouter,
} from "@/routes/auth-routes";
import { rootRouter } from "@/routes/index";
import { purchaseWritingRouter } from "@/routes/writing.routes";
import { addCoinRouter } from "@/routes/transaction.routes";

const app = express();
const PORT = process.env.PORT || 3500;

// CUSTOM LOGGER MIDDLEWARE
app.use(logger);

// CORS
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// DATABASE CONNECTION
sequelize;
testDbConnection();

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);

app.use(verifyJWT);
app.use("/logout", logoutRouter);
app.use("/purchase-writing", purchaseWritingRouter);
app.use("/add-coins", addCoinRouter);

app.get("/*", (req, res) => {
  res.status(404).json({ message: "We could not find the page you want." });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
