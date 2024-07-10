/*
  Warnings:

  - You are about to drop the column `nameCardBrand` on the `CarBrand` table. All the data in the column will be lost.
  - Added the required column `nameCarBrand` to the `CarBrand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarBrand" DROP COLUMN "nameCardBrand",
ADD COLUMN     "nameCarBrand" TEXT NOT NULL;
