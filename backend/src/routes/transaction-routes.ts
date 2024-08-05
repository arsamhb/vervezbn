import { Router } from "express";
import { chargeWallet } from "../controllers/transaction.contorller";
import { validateTransactionChargeRequest } from "@/middleware/transaction-validation-middleware"
export const chargeWalletRouter = Router();

chargeWalletRouter.post("/charge-wallet", validateTransactionChargeRequest, chargeWallet);
