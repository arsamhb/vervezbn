/*
  Warnings:

  - The values [ACADEMIC,GENERAL] on the enum `WritingType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `examType` to the `Writing` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('ACADEMIC', 'GENERAL');

-- AlterEnum
BEGIN;
CREATE TYPE "WritingType_new" AS ENUM ('LETTER', 'ESSAY');
ALTER TYPE "WritingType" RENAME TO "WritingType_old";
ALTER TYPE "WritingType_new" RENAME TO "WritingType";
DROP TYPE "WritingType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Writing" ADD COLUMN     "examType" "ExamType" NOT NULL;
