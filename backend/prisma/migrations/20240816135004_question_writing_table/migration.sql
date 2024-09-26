/*
  Warnings:

  - You are about to drop the column `question` on the `Writing` table. All the data in the column will be lost.
  - Added the required column `cueCard` to the `Writing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Writing" DROP COLUMN "question",
ADD COLUMN     "cueCard" TEXT NOT NULL;
