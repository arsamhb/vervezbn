import { Request, Response } from "express";
import { createAppTransaction, createBankTransaction } from "../repositories/transaction.repository";
import { convertRialToCoin } from "@/controllers/utils/transaction-utils"
import { getUserById, updateUserBalance } from "@/repositories/user.repository";
import { AppTransactionDescription } from "@prisma/client";


export const chargeWallet = async (req: Request, res: Response) => {
  const { amount, id: userId } = req.body;

  const coinsCount = convertRialToCoin(amount)

  if (coinsCount === -1) {
    return res
      .status(500)
      .json({ message: "We did not find env file. So please try again later." });
  }

  try {
    const user = await getUserById(userId);
    if (!user)
      return res
        .status(500)
        .json({ message: "Something happened please try again later" });

    console.log("typeof amount", typeof amount);

    await updateUserBalance(user.id, coinsCount);
    await createAppTransaction(coinsCount, user.id, AppTransactionDescription.WALLET_CHARGE)
    await createBankTransaction(amount, user.id);

    res.status(200).json({ message: "Coins added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
