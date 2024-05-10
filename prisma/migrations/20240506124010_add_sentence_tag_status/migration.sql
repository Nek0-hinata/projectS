/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticleSentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SentenceTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "TagStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- DropForeignKey
ALTER TABLE "ArticleSentence" DROP CONSTRAINT "ArticleSentence_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleSentence" DROP CONSTRAINT "ArticleSentence_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "SentenceTag" DROP CONSTRAINT "SentenceTag_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "SentenceTag" DROP CONSTRAINT "SentenceTag_tagId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'User';

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "ArticleSentence";

-- DropTable
DROP TABLE "Sentence";

-- DropTable
DROP TABLE "SentenceTag";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "articleStatus" "ArticleStatus" NOT NULL DEFAULT 'UnFinished',

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentence" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,
    "startPosition" INTEGER NOT NULL,
    "endPosition" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentenceTag" (
    "id" SERIAL NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "status" "TagStatus" NOT NULL DEFAULT 'Pending',
    "reviewedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sentenceTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SentenceToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SentenceToTag_AB_unique" ON "_SentenceToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SentenceToTag_B_index" ON "_SentenceToTag"("B");

-- AddForeignKey
ALTER TABLE "sentence" ADD CONSTRAINT "sentence_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentenceTag" ADD CONSTRAINT "sentenceTag_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentenceTag" ADD CONSTRAINT "sentenceTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SentenceToTag" ADD CONSTRAINT "_SentenceToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SentenceToTag" ADD CONSTRAINT "_SentenceToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
