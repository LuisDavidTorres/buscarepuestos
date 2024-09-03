-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_companyID_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "verified" DROP NOT NULL,
ALTER COLUMN "verified" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "companyID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
