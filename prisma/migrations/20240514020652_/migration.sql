/*
  Warnings:

  - Added the required column `fileName` to the `imagesQuotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagesQuotation" ADD COLUMN     "fileName" TEXT NOT NULL;
