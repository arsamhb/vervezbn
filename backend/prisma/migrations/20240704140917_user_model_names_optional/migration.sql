/*
  Warnings:

  - A unique constraint covering the columns `[lastName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_lastName_key" ON "User"("lastName");
