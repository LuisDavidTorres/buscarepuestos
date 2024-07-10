/*
  Warnings:

  - You are about to drop the column `EmailVerified` on the `UserAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "EmailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
