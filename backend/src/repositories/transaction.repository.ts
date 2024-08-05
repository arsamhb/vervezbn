import { AppTransactionDescription } from "@prisma/client";
import prisma from "../database/prisma-client";

export const createBankTransaction = async (amount: number, userId: string) => {
  return prisma.bankTransaction.create({ data: { amount, userId } })
};

export const createAppTransaction = async (amount: number, userId: string, description: AppTransactionDescription) => {
  return prisma.appTransaction.create({ data: { amount, userId, description } })
}