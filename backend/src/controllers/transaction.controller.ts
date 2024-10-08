import { Request, Response } from "express";
import {
  createTransaction,
  findUserTransactions,
} from "../repositories/transaction.repository";
import { convertRialToCoin } from "@/controllers/utils/transaction-utils";
import { getUserById, updateUserBalance } from "@/repositories/user.repository";
import { TransactionDescription } from "@prisma/client";
import { DEFAULT_TAKE, DEFAULT_SKIP } from "@/constants/pagination";

export const chargeWallet = async (req: Request, res: Response) => {
  const { amount, id: userId } = req.body;

  const coinsCount = convertRialToCoin(amount);

  if (coinsCount === -1 || !coinsCount) {
    return res.status(500).json({
      message: "We did not find env file. So please try again later.",
    });
  }

  try {
    const user = await getUserById(userId);
    if (!user)
      return res.status(404).json({ message: "We did not found the user" });

    await updateUserBalance(user.id, coinsCount);
    await createTransaction(
      amount,
      user.id,
      TransactionDescription.WALLET_CHARGE,
      "REMOTE"
    );
    await createTransaction(
      coinsCount,
      user.id,
      TransactionDescription.WALLET_CHARGE,
      "LOCAL"
    );

    res.status(200).json({ message: "Coins added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserBankTransactions = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const skip = parseInt(req.query.skip as string, 10) || DEFAULT_SKIP;
  const take = parseInt(req.query.take as string, 10) || DEFAULT_TAKE;

  try {
    const user = await getUserById(userId);
    if (!user)
      return res.status(404).json({ message: "We did not found the user" });

    const transactions = await findUserTransactions(
      user.id,
      "REMOTE",
      skip,
      take
    );
    return res.status(200).json({ data: transactions });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

export const getUserAppTransactions = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const skip = parseInt(req.query.skip as string, 10) || DEFAULT_SKIP;
  const take = parseInt(req.query.take as string, 10) || DEFAULT_TAKE;

  try {
    const user = await getUserById(userId);
    if (!user)
      return res.status(404).json({ message: "We did not found the user" });

    const transactions = await findUserTransactions(
      user.id,
      "LOCAL",
      skip,
      take
    );
    return res.status(200).json({ data: transactions });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
