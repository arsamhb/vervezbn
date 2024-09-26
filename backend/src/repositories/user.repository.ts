import { User } from "@prisma/client";
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
      phoneNumber: true,
      birthDate: true,
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

export const updateUserInfo = async (userId: string, userInfo: Pick<User, "firstName" | "lastName" | "birthDate" | "phoneNumber">) => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      birthDate: userInfo.birthDate,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phoneNumber: userInfo.phoneNumber
    }, 
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      birthDate: true,
      createdAt: true,
      balance: true,
      referralCode: true,
      role: true,
    }
  })
}
