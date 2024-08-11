/*
  Warnings:

  - Added the required column `writingType` to the `Writing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Writing" ADD COLUMN     "writingType" TEXT NOT NULL;
