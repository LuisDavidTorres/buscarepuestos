/*
  Warnings:

  - Made the column `verified` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "verified" SET NOT NULL,
ALTER COLUMN "verified" SET DEFAULT 1;
