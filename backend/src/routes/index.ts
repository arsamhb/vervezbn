import { rootRouter } from "./root-router";
import { authRouter } from "@/routes/auth-routes";
import { verifyJWT } from "@/middleware/verifyJWT";
import { writingRouter } from "@/routes/writing-routes";
import { transactionRouter } from "@/routes/transaction-routes";
import { Express } from "express";
import { userRouter } from "@/routes/user-routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger";


export const router = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/", rootRouter);
  app.use("/auth", authRouter);
  app.use(verifyJWT);
  app.use("/user", userRouter);
  app.use("/writing", writingRouter);
  app.use("/transaction", transactionRouter);
  app.get("/*", (req, res) => {
    res.status(404).json({ message: "We could not find the page you want." });
  });
};
