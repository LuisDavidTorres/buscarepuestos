/*
  Warnings:

  - You are about to drop the `feature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubscriptionCharacteristics" DROP CONSTRAINT "SubscriptionCharacteristics_idFeature_fkey";

-- DropTable
DROP TABLE "feature";

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubscriptionCharacteristics" ADD CONSTRAINT "SubscriptionCharacteristics_idFeature_fkey" FOREIGN KEY ("idFeature") REFERENCES "Feature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
