import { TransactionType } from "@prisma/client";
import prisma from "../database/prisma-client";

export const createTransaction = async (
  amount: number,
  type: TransactionType,
  walletId: string
) => {
  return await prisma.transaction.create({ data: { amount, type, walletId } });
};
