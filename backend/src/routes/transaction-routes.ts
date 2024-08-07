import { Router } from "express";
import { chargeWallet, getUserBankTransactions } from "../controllers/transaction.contorller";
import { validateTransactionCharge } from "@/middleware/transaction-validation-middleware"


export const transactionRouter = Router();

transactionRouter.post("/charge-wallet", validateTransactionCharge, chargeWallet);
transactionRouter.get("/:userId/bankTransactions", getUserBankTransactions)