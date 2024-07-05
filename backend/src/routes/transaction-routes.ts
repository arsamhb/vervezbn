import { Router } from "express";
import { addCoins } from "../controllers/transaction/transaction-contorller";

export const addCoinRouter = Router();

addCoinRouter.post("/", addCoins);
