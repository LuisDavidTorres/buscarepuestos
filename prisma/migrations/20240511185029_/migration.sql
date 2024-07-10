/*
  Warnings:

  - The `price` column on the `UserQuotation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserQuotation" ADD COLUMN     "sent" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
