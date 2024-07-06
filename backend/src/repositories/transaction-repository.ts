import prisma from "../database/prisma-client";

export const createTransaction = async (
  amount: number,
  userId: string
) => {
  return await prisma.transaction.create({ data: { amount, userId } });
};
