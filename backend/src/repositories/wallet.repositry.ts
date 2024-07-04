import prisma from "../database/prisma-client";

export const createWallet = async (userId: string) => {
  return await prisma.wallet.create({ data: { userId } });
};

export const getWalletByUserId = async (userId: string) => {
  return await prisma.wallet.findUnique({ where: { userId } });
};

export const updateWalletBalance = async (walletId: string, amount: number) => {
  return await prisma.wallet.update({
    where: { id: walletId },
    data: { balance: { increment: amount } },
  });
};


