/*
  Warnings:

  - You are about to drop the column `fileName` on the `imagesQuotation` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `imagesQuotation` table. All the data in the column will be lost.
  - You are about to drop the column `imageData` on the `imagesQuotation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "imagesQuotation" DROP COLUMN "fileName",
DROP COLUMN "fileType",
DROP COLUMN "imageData";
