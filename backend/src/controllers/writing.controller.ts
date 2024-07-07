import { Request, Response } from "express";
import {
  updateWalletBalance,
} from "../repositories/wallet.repositry";
import { createTransaction } from "../repositories/transaction.repository";
import { createWriting } from "../repositories/writing.repository";
import dotenv from "dotenv";
import { getUserById } from "@/repositories/user.repository";
import { getWritingFromAbdoliService } from "@/MOCK/writing-mock-function"

dotenv.config();

export const purchaseWriting = async (req: Request, res: Response) => {
  const { content, cueId, writingLevel, id: userId } = req.body;

  if (!process.env.WRITING_PREMIUM_TASK_PRICE || !process.env.WRITING_NORMAL_TASK_PRICE) { return res.status(500).json({ message: "Internal server error please purchase later" }) }
  const taskCost = writingLevel === "PREMIUM" ? process.env.WRITING_PREMIUM_TASK_PRICE : process.env.WRITING_NORMAL_TASK_PRICE;

  try {
    const user = await getUserById(userId);
    if (!user)
      return res.status(500).json({ message: "internal server error" });
    if (user.balance < +taskCost) {
      return res.status(400).json({ message: "insufficient balance" });
    }

    await updateWalletBalance(user.id, -taskCost);
    await createTransaction(-taskCost, user.id);
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

export const getWriting = async (req: Request, res: Response) => {
  const { writingType } = req.body

  const writing = await getWritingFromAbdoliService(writingType)

  res.json(writing)
}


