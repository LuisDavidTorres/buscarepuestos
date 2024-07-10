/*
  Warnings:

  - You are about to drop the column `sellerNumber` on the `UserQuotation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserQuotation" DROP COLUMN "sellerNumber",
ADD COLUMN     "sellerPhone" TEXT NOT NULL DEFAULT '';
