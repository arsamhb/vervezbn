import { Request, Response } from "express";
import { createTransaction } from "../../repositories/transaction-repository";
import {
  getWalletByUserId,
  updateWalletBalance,
} from "../../repositories/wallet-repositry";

export const addCoins = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  const { amount } = req.body;

  try {
    const wallet = await getWalletByUserId(userId);
    if (!wallet)
      return res
        .status(500)
        .json({ message: "Something happened please try again later" });

    await updateWalletBalance(wallet.id, amount);
    await createTransaction(amount, "CREDIT", wallet.id);

    res.status(200).json({ message: "Coins added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
