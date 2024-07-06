import { rootRouter } from "./root-router";
import {
    refreshRouter,
    registerRouter,
    authRouter,
    logoutRouter,
} from "@/routes/auth-routes";
import { verifyJWT } from "@/middleware/verifyJWT";
import { purchaseWritingRouter } from "@/routes/writing-routes";
import { addCoinRouter } from "@/routes/transaction-routes";
import { Express } from "express";

export const router = (app: Express) => {
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
}

