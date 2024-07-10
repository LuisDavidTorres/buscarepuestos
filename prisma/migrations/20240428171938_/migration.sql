/*
  Warnings:

  - Added the required column `discountPrice` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Made the column `idCompany` on table `UserAccount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `idUserType` on table `UserAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_idCompany_fkey";

-- DropForeignKey
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_idUserType_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "discountPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "UserAccount" ALTER COLUMN "idCompany" SET NOT NULL,
ALTER COLUMN "idUserType" SET NOT NULL,
ALTER COLUMN "idUserType" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "feature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionCharacteristics" (
    "id" SERIAL NOT NULL,
    "idSubscription" INTEGER NOT NULL,
    "idFeature" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionCharacteristics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_idUserType_fkey" FOREIGN KEY ("idUserType") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionCharacteristics" ADD CONSTRAINT "SubscriptionCharacteristics_idSubscription_fkey" FOREIGN KEY ("idSubscription") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionCharacteristics" ADD CONSTRAINT "SubscriptionCharacteristics_idFeature_fkey" FOREIGN KEY ("idFeature") REFERENCES "feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
