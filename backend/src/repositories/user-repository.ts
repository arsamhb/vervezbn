import prisma from "../database/prisma-client";

export async function findUserByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export async function registerNewUser(email: string, password: string) {
  return await prisma.user.create({ data: { email, password } });
}
