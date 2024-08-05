import { Request, Response } from "express";
import {
  updateUserBalance,
} from "../repositories/user.repository";
import { createAppTransaction } from "../repositories/transaction.repository";
import dotenv from "dotenv";
import { getUserBalanceByUserId } from "@/repositories/user.repository";
import { getWritingFromAbdoliService, submitWritingToAbdoliService } from "@/MOCK/writing-mock-function"
import { User } from "@prisma/client";

dotenv.config();

export const purchaseWriting = async (user: User, cost: number) => {
  await updateUserBalance(user.id, -cost);
  await createAppTransaction(-cost, user.id, "WRITING_COMMENT");
};

export const getWriting = async (req: Request, res: Response) => {
  const { writingType } = req.body

  const writing = await getWritingFromAbdoliService(writingType)

  res.json(writing)
}

export const submitWriting = async (req: Request, res: Response) => {
  const { userId, cueId, answer, reviewLevel } = req.body

  const user = await getUserBalanceByUserId(userId)
  if (!user) return res.status(500).json({ error: "Internal server error" })
  if (!process.env.WRITING_PREMIUM_TASK_PRICE) return res.status(500).json({ error: "Internal server error" })

  if (user?.balance < parseInt(process.env.WRITING_PREMIUM_TASK_PRICE)) {
    return res.status(500).json({ error: "Internal server error" })
  } else {
    purchaseWriting(user, parseInt(process.env.WRITING_PREMIUM_TASK_PRICE))
  }

  const response = await submitWritingToAbdoliService(userId, cueId, answer, reviewLevel)

  res.status(200).json(response)
}