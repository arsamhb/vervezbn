-- CreateEnum
CREATE TYPE "InternalTransactionDescription" AS ENUM ('SINGUP_GIFT', 'REFER_GIFT', 'BONUS', 'WRITING_COMMENT', 'WALLET_CHARGE');

-- CreateTable
CREATE TABLE "InternalTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" "InternalTransactionDescription" NOT NULL,

    CONSTRAINT "InternalTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InternalTransaction_id_key" ON "InternalTransaction"("id");

-- AddForeignKey
ALTER TABLE "InternalTransaction" ADD CONSTRAINT "InternalTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
