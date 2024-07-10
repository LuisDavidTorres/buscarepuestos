/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idCity` on the `City` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_idCity_fkey";

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
DROP COLUMN "idCity",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_idCity_fkey" FOREIGN KEY ("idCity") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
