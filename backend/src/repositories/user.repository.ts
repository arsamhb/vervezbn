import prisma from "../database/prisma-client";

export async function findUserByEmail(userEmail: string) {
  return prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserInfoById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      balance: true,
      referralCode: true,
      role: true,
    }
  });
}

export async function registerNewUser(email: string, password: string, referralCode: string) {
  return prisma.user.create({ data: { email, password, referralCode } });
}

export async function isReferralCodeUnique(code: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { referralCode: code } })
  if (user) {
    return false
  }
  return true
}

export const getUserBalanceByUserId = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUserBalance = async (id: string, amount: number) => {
  return prisma.user.update({
    where: { id },
    data: { balance: { increment: amount } },
  });
};


