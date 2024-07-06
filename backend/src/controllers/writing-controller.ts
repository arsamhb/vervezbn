import { Request, Response } from "express";
import {
  getWalletByUserId,
  updateWalletBalance,
} from "../repositories/wallet-repositry";
import { createTransaction } from "../repositories/transaction-repository";
import { createWriting } from "../repositories/writing-repository";

export const purchaseWriting = async (req: Request, res: Response) => {
  const { content, cueId, writingLevel,id:userId } = req.body;

  const taskCost = writingLevel === "PREMIUM" ? 3 : 2;

  try {
    const wallet = await getWalletByUserId(userId);
    if (!wallet)
      return res.status(500).json({ message: "internal server error" });
    if (wallet.balance < taskCost) {
      return res.status(400).json({ message: "insufficient balance" });
    }

    await updateWalletBalance(wallet.id, -taskCost);
    await createTransaction(-taskCost, "DEBIT", wallet.id);
    const writing = await createWriting({
      userId,
      content,
      cueId,
      writingLevel,
    });

    res.status(201).json(writing);
  } catch {
    res.status(500).json({ message: "Internal server err" });
  }
};
