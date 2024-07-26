/*
  Warnings:

  - Made the column `carModel` on table `Quotation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quotation" ALTER COLUMN "idCar" DROP NOT NULL,
ALTER COLUMN "carModel" SET NOT NULL,
ALTER COLUMN "carModel" SET DATA TYPE TEXT;
