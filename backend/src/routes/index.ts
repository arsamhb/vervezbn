import { rootRouter } from "./root-router";
import {
    authRouter,
} from "@/routes/auth-routes";
import { verifyJWT } from "@/middleware/verifyJWT";
import { writingRouter } from "@/routes/writing-routes";
import { chargeWalletRouter } from "@/routes/transaction-routes";
import { Express } from "express";

export const router = (app: Express) => {
    app.use("/", rootRouter);
    app.use("/auth", authRouter);
    app.use(verifyJWT);
    app.use("/writing", writingRouter);
    app.use("/charge-wallet", chargeWalletRouter);
    app.get("/*", (req, res) => {
        res.status(404).json({ message: "We could not find the page you want." });
    });
}

