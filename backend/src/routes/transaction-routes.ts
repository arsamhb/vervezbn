import { Router } from "express";
import { chargeWallet } from "../controllers/transaction-contorller";

export const chargeWalletRouter = Router();

chargeWalletRouter.post("/", chargeWallet);
