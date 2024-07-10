/*
  Warnings:

  - Added the required column `url` to the `imagesQuotation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagesQuotation" ADD COLUMN     "url" TEXT NOT NULL;
