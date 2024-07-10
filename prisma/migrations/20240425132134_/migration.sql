-- DropForeignKey
ALTER TABLE "UserAccount" DROP CONSTRAINT "UserAccount_idCompany_fkey";

-- AlterTable
ALTER TABLE "UserAccount" ALTER COLUMN "idCompany" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
