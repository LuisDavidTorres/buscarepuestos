/*
  Warnings:

  - Added the required column `assignment` to the `CompanyCarBrand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyCarBrand" ADD COLUMN     "assignment" TIMESTAMP(3) NOT NULL;
