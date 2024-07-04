import prisma from "../database/prisma-client";

export async function main() {
  //   const user = await prisma.user.create({
  //     data: {
  //       email: "arsam.hb@gmail.com",
  //       firstName: "arsam",
  //       lastName: "bkhatyari",
  //       passwrd: "password",
  //     },
  //   });
  //   const user = await prisma.user.deleteMany();
  //   console.log(user);
}

// .findMany()
// .deleteMany()

// main()
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(async () => {
//     await prisma.$disconnect;
//   });

export async function findUserWithEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export async function registerNewUser(email: string, password: string) {
  return await prisma.user.create({ data: { email, password } });
}
