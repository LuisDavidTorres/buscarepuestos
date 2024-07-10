import { HeaderOut } from "../ui/header/Out";
import { PaymentSecurity } from "../ui/payment/Payment-security";
import { CardNotSuccessfulPayment } from "../ui/payment/Card/Not-Successful-payment";

interface PageProps {
  searchParams: {
    oc: string;
  };
}


export default function Page({ searchParams }: PageProps) {
  const { oc } = searchParams;

  return (
    <>
      <HeaderOut />
      <div className="min-h-screen bg-white">
        <div className="flex flex-col justify-center items-center">
          <section className="w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12">
            <CardNotSuccessfulPayment purchaseOrder={oc}/>
          </section>
          <section className="flex justify-items-center items-center space-x-5 mt-14">
            <PaymentSecurity />
          </section>
        </div>
      </div>
    </>
  );
}
