-- CreateTable
CREATE TABLE "PaymentDetail" (
    "id" SERIAL NOT NULL,
    "idUserSubscription" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentAmount" DECIMAL(10,2) NOT NULL,
    "paymentDescription" TEXT NOT NULL,

    CONSTRAINT "PaymentDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_idUserSubscription_fkey" FOREIGN KEY ("idUserSubscription") REFERENCES "UserSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
