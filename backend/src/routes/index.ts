import { rootRouter } from "./root-router";
import {
    authRouter,
} from "@/routes/auth-routes";
import { verifyJWT } from "@/middleware/verifyJWT";
import { writingRouter } from "@/routes/writing-routes";
import { chargeWalletRouter } from "@/routes/transaction-routes";
import { Express } from "express";
import { userRouter } from "@/routes/user-routes"

export const router = (app: Express) => {
    app.use("/", rootRouter);
    app.use("/auth", authRouter);
    app.use(verifyJWT);
    app.use("/user", userRouter);
    app.use("/writing", writingRouter);
    app.use("/transaction", chargeWalletRouter);
    app.get("/*", (req, res) => {
        res.status(404).json({ message: "We could not find the page you want." });
    });
}

