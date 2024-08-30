import { Router } from "express";
import {
  chargeWallet,
  getUserBankTransactions,
  getUserAppTransactions,
} from "../controllers/transaction.controller";
import { validateTransactionCharge } from "@/middleware/validations/transaction-validation-middleware";

export const transactionRouter = Router();

transactionRouter.post(
  "/charge-wallet",
  validateTransactionCharge,
  chargeWallet
);
transactionRouter.get("/:userId/bankTransactions", getUserBankTransactions);
transactionRouter.get("/:userId/appTransactions", getUserAppTransactions);
