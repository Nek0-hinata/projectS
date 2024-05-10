/*
  Warnings:

  - You are about to drop the column `idNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "idNumber",
DROP COLUMN "name",
ALTER COLUMN "phoneNumber" DROP NOT NULL;
