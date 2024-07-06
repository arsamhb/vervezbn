import prisma from "../database/prisma-client";

export async function findUserByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export async function getUserById(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function registerNewUser(email: string, password: string, referralCode: string) {
  return await prisma.user.create({ data: { email, password, referralCode } });
}

export async function isReferralCodeUnique(code: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { referralCode: code } })
  if (user) {
    return false
  }
  return true
}