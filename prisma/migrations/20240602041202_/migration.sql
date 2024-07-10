/*
  Warnings:

  - You are about to drop the column `expiration` on the `Token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "expiration",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");
