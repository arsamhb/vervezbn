import { Request, Response } from "express";
import { updateUserBalance } from "../repositories/user.repository";
import { createTransaction } from "../repositories/transaction.repository";
import dotenv from "dotenv";
import { getUserBalanceByUserId } from "@/repositories/user.repository";
import { User } from "@prisma/client";
import {
  getWritingFromWritingService,
  postUserWritingToWritingService,
} from "@/services/writing-service";
import { assignWritingToUser } from "@/repositories/writing.repository";
import { ERRORS } from "@/constants/response.messages";
import { ENV } from "@/config/env.config";

dotenv.config();

export const purchaseWriting = async (user: User, cost: number) => {
  await updateUserBalance(user.id, -cost);
  await createTransaction(-cost, user.id, "WRITING_COMMENT", "LOCAL");
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
    res.status(500).json({ error: `${ERRORS.INTERNAL_ERROR} Error: ${error}` });
  }
};

export const submitWriting = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { writingId, writing } = req.body;
  const { WRITING_PREMIUM_TASK_PRICE } = ENV;
  const user = await getUserBalanceByUserId(userId);
  if (!user) return res.status(401).json({ error: ERRORS.USER_NOT_FOUND });
  if (!WRITING_PREMIUM_TASK_PRICE)
    return res.status(500).json({ error: ERRORS.ENV_VAR_NOT_FOUND });


  if (user.balance < parseInt(WRITING_PREMIUM_TASK_PRICE, 10)) {
    return res.status(400).json({ error: ERRORS.NOT_ENOUGH_COINS });
  } else {
    purchaseWriting(user, parseInt(WRITING_PREMIUM_TASK_PRICE, 10));
  }

  try {
    const response = await postUserWritingToWritingService(writing, writingId);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `${ERRORS.INTERNAL_ERROR} Error: ${error}` });
  }
};

