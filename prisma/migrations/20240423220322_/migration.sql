/*
  Warnings:

  - A unique constraint covering the columns `[nameCarBrand]` on the table `CarBrand` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CarBrand_nameCarBrand_key" ON "CarBrand"("nameCarBrand");
