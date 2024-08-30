import { TransactionDescription, TransactionType } from "@prisma/client";
import prisma from "../database/prisma-client";

export const createTransaction = async (
  amount: number,
  userId: string,
  description: TransactionDescription,
  transactionType: TransactionType
) => {
  return prisma.transaction.create({
    data: { amount, userId, description, transactionType },
  });
};

export const findUserTransactions = async (
  userId: string,
  transactionType: TransactionType,
  skip: number,
  take: number
) => {
  return prisma.transaction.findMany({
    where: {
      userId,
      transactionType,
    },
    skip,
    take,
  });
};
