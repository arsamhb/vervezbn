import { Request, Response } from "express";
import { getUserById, updateUserBalance } from "../repositories/user.repository";
import { createAppTransaction } from "../repositories/transaction.repository";
import dotenv from "dotenv";
import { getUserBalanceByUserId } from "@/repositories/user.repository";
import { User } from "@prisma/client";
import {
  getWritingFromWritingService,
  postUserWritingToWritingService,
} from "@/services/writing-service";
import { assignWritingToUser, findUsersWriting } from "@/repositories/writing.repository";
import { DEFAULT_SKIP, DEFAULT_TAKE } from "@/constants/pagination";

dotenv.config();

export const purchaseWriting = async (user: User, cost: number) => {
  await updateUserBalance(user.id, -cost);
  await createAppTransaction(-cost, user.id, "WRITING_COMMENT");
};

export const getWriting = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const taskType = req.query.type;

  try {
    const writing = await getWritingFromWritingService(
      userId,
      taskType as "essay" | "letter"
    );
    await assignWritingToUser(userId, writing);
    const response = {
      cueCard: writing.writing_prompt.content,
      taskType: writing.writing_prompt.task,
      cueId: writing.writing_id,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "something bad happened" });
  }
};

export const submitWriting = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { writingId, writing } = req.body;

  const user = await getUserBalanceByUserId(userId);
  if (!user) return res.status(500).json({ error: "Internal server error" });
  if (!process.env.WRITING_PREMIUM_TASK_PRICE)
    return res.status(500).json({ error: "Internal server error" });

  if (user?.balance < parseInt(process.env.WRITING_PREMIUM_TASK_PRICE)) {
    return res.status(500).json({ error: "Internal server error" });
  } else {
    purchaseWriting(user, parseInt(process.env.WRITING_PREMIUM_TASK_PRICE));
  }

  const response = await postUserWritingToWritingService(writing, writingId);

  if (response === "success") {
    return res.status(200).json(response);
  }

  if (response === "error") {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersWritings = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const skip = parseInt(req.query.skip as string, 10) || DEFAULT_SKIP
  const take = parseInt(req.query.take as string, 10) || DEFAULT_TAKE

  const user = await getUserById(userId);
  if (!user)
    return res
      .status(404)
      .json({ message: "We did not found the user" });

  try {
    const writings = await findUsersWriting(userId, skip, take)
    return res.status(200).json({ data: writings })
  } catch (error) {
    return res.status(500).json({ error: "internal server error" })
  }
}