-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('Finished', 'UnFinished');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'UnFinished';
