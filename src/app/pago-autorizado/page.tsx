import { HeaderOut } from "../ui/header/Out";
import { CardSuccessfulPayment } from "../ui/payment/Card/Successful-payment";
import { PaymentSecurity } from "../ui/payment/Payment-security";
import jwt from "jsonwebtoken";

interface PageProps {
  searchParams: {
    oc: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const { oc } = searchParams;

  const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

  if (!SECRET_JWT_KEY) {
    console.log(
      "La firma no es válida porque no hay una clave secreta definida."
    );

    throw new Error("Clave secreta JWT no definida.");
  }

  let detailsPayment = [];

  try {
    const decoded = jwt.verify(oc, SECRET_JWT_KEY) as any;
    detailsPayment.push(decoded);
  } catch (error) {
    console.log("Error al verificar el token");
  }

  let details = detailsPayment[0];

  if (!details || details === null) {
    return (
      <>
        <HeaderOut />
        <div className="min-h-screen bg-white dark:text-black">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl mt-10">Orden de compra no válida</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderOut />
      <div className="min-h-screen bg-white dark:text-black">
        <div className="flex flex-col justify-center items-center">
          <section className="w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:w-4/12">
            <CardSuccessfulPayment details={details} />
          </section>
          <section className="flex justify-items-center items-center space-x-5 mt-4">
            <PaymentSecurity />
          </section>
        </div>
      </div>
    </>
  );
}
