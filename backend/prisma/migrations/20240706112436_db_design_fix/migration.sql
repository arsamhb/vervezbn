/*
  Warnings:

  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_walletId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropIndex
DROP INDEX "Transaction_walletId_createdAt_idx";

-- DropIndex
DROP INDEX "Writing_userId_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "type",
DROP COLUMN "walletId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Wallet";

-- DropEnum
DROP TYPE "TransactionType";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
