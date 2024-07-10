-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "rubric" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarBrand" (
    "idCardBrand" SERIAL NOT NULL,
    "nameCardBrand" TEXT NOT NULL,

    CONSTRAINT "CarBrand_pkey" PRIMARY KEY ("idCardBrand")
);

-- CreateTable
CREATE TABLE "CompanyCarBrand" (
    "id" SERIAL NOT NULL,
    "idCar" INTEGER NOT NULL,
    "idCompany" INTEGER NOT NULL,

    CONSTRAINT "CompanyCarBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "userTypeName" TEXT NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccount" (
    "id" SERIAL NOT NULL,
    "idCompany" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "idUserType" INTEGER NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idSubscription" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "idCity" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("idCity")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "idQuotation" SERIAL NOT NULL,
    "idCar" TEXT NOT NULL,
    "idCity" INTEGER NOT NULL,
    "spareName" TEXT NOT NULL,
    "spareType" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "carBrand" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "dateQuotation" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("idQuotation")
);

-- CreateTable
CREATE TABLE "imagesQuotation" (
    "idImg" SERIAL NOT NULL,
    "idQuotation" INTEGER NOT NULL,
    "imageData" BYTEA NOT NULL,
    "fileType" TEXT NOT NULL,

    CONSTRAINT "imagesQuotation_pkey" PRIMARY KEY ("idImg")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_rut_key" ON "Company"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userID_key" ON "Company"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userID_fkey" FOREIGN KEY ("userID") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCarBrand" ADD CONSTRAINT "CompanyCarBrand_idCar_fkey" FOREIGN KEY ("idCar") REFERENCES "CarBrand"("idCardBrand") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCarBrand" ADD CONSTRAINT "CompanyCarBrand_idCompany_fkey" FOREIGN KEY ("idCompany") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_idUserType_fkey" FOREIGN KEY ("idUserType") REFERENCES "UserType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_idSubscription_fkey" FOREIGN KEY ("idSubscription") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_idCity_fkey" FOREIGN KEY ("idCity") REFERENCES "City"("idCity") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagesQuotation" ADD CONSTRAINT "imagesQuotation_idQuotation_fkey" FOREIGN KEY ("idQuotation") REFERENCES "Quotation"("idQuotation") ON DELETE RESTRICT ON UPDATE CASCADE;
