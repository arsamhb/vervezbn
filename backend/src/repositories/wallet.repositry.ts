import prisma from "../database/prisma-client";


export const getWalletByUserId = async (id: string) => {
  return  prisma.user.findUnique({ where: { id } });
};

export const updateWalletBalance = async (id: string, amount: number) => {
  return  prisma.user.update({
    where: { id },
    data: { balance: { increment: amount } },
  });
};


