-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
