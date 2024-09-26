/*
  Warnings:

  - You are about to drop the column `writingLevel` on the `Writing` table. All the data in the column will be lost.
  - Added the required column `commentLevel` to the `Writing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `writingType` on the `Writing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CommentLevel" AS ENUM ('FREE', 'SILVER', 'GOLD');

-- AlterTable
ALTER TABLE "Writing" DROP COLUMN "writingLevel",
ADD COLUMN     "commentLevel" "CommentLevel" NOT NULL,
DROP COLUMN "writingType",
ADD COLUMN     "writingType" "WritingType" NOT NULL;

-- DropEnum
DROP TYPE "WritingLevel";
