import { Router } from "express";
import { addCoins } from "../controllers/transaction/transaction.contorller";

export const addCoinRouter = Router();

addCoinRouter.post("/add-coins", addCoins);
