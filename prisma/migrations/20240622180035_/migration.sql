-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "idTypeToken" INTEGER;

-- CreateTable
CREATE TABLE "TypeToken" (
    "id" SERIAL NOT NULL,
    "tokenName" TEXT NOT NULL,

    CONSTRAINT "TypeToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_idTypeToken_fkey" FOREIGN KEY ("idTypeToken") REFERENCES "TypeToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
