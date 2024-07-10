/*
  Warnings:

  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_idUser_fkey";

-- DropTable
DROP TABLE "token";

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
