import { DashboardHeader } from "@/app/ui/header/Dashboard";
import { CardPlanHorizontal } from "@/app/ui/cards/Plan-horizontal";
import { TransbankPayment } from "@/app/ui/transbank/Transbank-payment";
import { SupportInformation } from "@/app/ui/ListComponents/Support-information";
import Link from "next/link";

interface PageProps {
  searchParams: {
    plan: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const { plan } = searchParams;

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="flex justify-center p-8">
        <div>
          <div>
            <section className="mt-2">
              <h1 className="font-bold text-xl">
                Elige como deseas pagar tu plan
              </h1>
            </section>
            <section>
              <h1 className="font-bold mt-5 mb-2 text-base">Tu plan</h1>
              <CardPlanHorizontal planId={plan} />
            </section>
            <h1 className="text-lg mt-14 mb-6">Métodos de pago disponibles</h1>
            <section className="flex justify-center">
              <TransbankPayment />
            </section>
            <div className="w-80 text-center text-xs mt-5">
              <label>
                <p>
                  Al enviar sus datos y hacer Clic en Comprar suscripción,
                  acepta los Terminos y Condiciones.{" "}
                  <Link
                    href={"/terminos"}
                    target="_blank"
                    className="no-underline hover:underline text-blue-700"
                  >
                    Política de Privacidad.{" "}
                  </Link>
                  De nuestra Plataforma.
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <section className="px-10 py-16">
        <SupportInformation />
      </section>
    </div>
  );
}
