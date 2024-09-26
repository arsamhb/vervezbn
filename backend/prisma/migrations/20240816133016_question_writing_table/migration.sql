/*
  Warnings:

  - Added the required column `question` to the `Writing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Writing" ADD COLUMN     "question" TEXT NOT NULL;
