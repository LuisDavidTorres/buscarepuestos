/*
  Warnings:

  - A unique constraint covering the columns `[idUser]` on the table `UserSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_idUser_key" ON "UserSubscription"("idUser");
