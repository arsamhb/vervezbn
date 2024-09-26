/*
  Warnings:

  - Changed the type of `description` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionDescription" AS ENUM ('SINGUP_GIFT', 'REFER_GIFT', 'BONUS', 'WRITING_COMMENT', 'WALLET_CHARGE');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "description",
ADD COLUMN     "description" "TransactionDescription" NOT NULL;

-- DropEnum
DROP TYPE "AppTransactionDescription";
