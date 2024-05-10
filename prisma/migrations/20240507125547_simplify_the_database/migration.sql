/*
  Warnings:

  - The primary key for the `sentenceTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sentenceTag` table. All the data in the column will be lost.
  - You are about to drop the `_SentenceToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `billingStatement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `internetDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[color]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastSignInTime` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_SentenceToTag" DROP CONSTRAINT "_SentenceToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SentenceToTag" DROP CONSTRAINT "_SentenceToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "billingStatement" DROP CONSTRAINT "billingStatement_userId_fkey";

-- DropForeignKey
ALTER TABLE "internetDetail" DROP CONSTRAINT "internetDetail_userId_fkey";

-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_usersId_fkey";

-- AlterTable
ALTER TABLE "sentenceTag" DROP CONSTRAINT "sentenceTag_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "sentenceTag_pkey" PRIMARY KEY ("sentenceId", "tagId");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastSignInTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_SentenceToTag";

-- DropTable
DROP TABLE "billingStatement";

-- DropTable
DROP TABLE "internetDetail";

-- DropTable
DROP TABLE "log";

-- CreateIndex
CREATE UNIQUE INDEX "tag_color_key" ON "tag"("color");
