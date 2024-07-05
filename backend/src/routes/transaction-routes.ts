import { Router } from "express";
import { addCoins } from "../controllers/transaction-contorller";

export const addCoinRouter = Router();

addCoinRouter.post("/", addCoins);
