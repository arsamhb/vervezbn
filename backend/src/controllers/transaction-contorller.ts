import { Request, Response } from "express";
import { createTransaction } from "../repositories/transaction-repository";
import {
  updateWalletBalance,
} from "../repositories/wallet-repositry";
import { getUserById } from "@/repositories/user-repository";

export const addCoins = async (req: Request, res: Response) => {
  const { amount, id: userId } = req.body;

  try {
    const user = await getUserById(userId);
    if (!user)
      return res
        .status(500)
        .json({ message: "Something happened please try again later" });

    await updateWalletBalance(user.id, amount);
    await createTransaction(amount, user.id);

    res.status(200).json({ message: "Coins added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
