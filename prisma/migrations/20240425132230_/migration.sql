-- DropForeignKey
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_idUserType_fkey";

-- AlterTable
ALTER TABLE "UserAccount" ALTER COLUMN "idUserType" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_idUserType_fkey" FOREIGN KEY ("idUserType") REFERENCES "UserType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
