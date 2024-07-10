/*
  Warnings:

  - You are about to drop the column `userID` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idCompany]` on the table `UserAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `available` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clicks` to the `Quotation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userID_fkey";

-- DropIndex
DROP INDEX "Company_userID_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "userID";

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "available" BOOLEAN NOT NULL,
ADD COLUMN     "clicks" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserQuotation" (
    "id" SERIAL NOT NULL,
    "dateAccepted" TIMESTAMP(3) NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idQuotation" INTEGER NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "UserQuotation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_idCompany_key" ON "UserAccount"("idCompany");

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuotation" ADD CONSTRAINT "UserQuotation_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuotation" ADD CONSTRAINT "UserQuotation_idQuotation_fkey" FOREIGN KEY ("idQuotation") REFERENCES "Quotation"("idQuotation") ON DELETE RESTRICT ON UPDATE CASCADE;
