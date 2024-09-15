import Header from "@/app/ui/header/Header";
import { CardPlanHorizontal } from "@/app/ui/cards/Plan-horizontal";
import { SupportInformation } from "@/app/ui/ListComponents/Support-information";
import { TransbankPayment } from "@/app/ui/transbank/Transbank-payment";
import Link from "next/link";
import PageRedirect from "@/app/ui/buttons/Page-redirect";
import { IoTimeOutline } from "react-icons/io5";

interface PageProps {
  searchParams: {
    plan: string;
  };
}

async function LoadPLan({ plan }: { plan: string }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/subscriptions/" + plan,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  return data;
}

async function Page({ searchParams }: PageProps) {
  const { plan } = searchParams;
  const planSelected = await LoadPLan({ plan });

  return (
    <>
      <div>
        <Header />
      </div>
      <main className="min-h-screen h-auto bg-white text-black/60 dark:text-black/60">
        <div className="flex justify-center p-8">
          <div className="md:mx-10 p-6 text-center w-full md:w-2/5 bg-white shadow-md rounded-lg">
            <div className="flex justify-center mb-4">
              <IoTimeOutline className="text-4xl text-blue-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">
              Proceso de Verificaión de la Empresa
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Estamos revisando los documentos de tu empresa. Esto puede tardar
              hasta 24 horas. En cuanto esté verificada, podrás usar todas
              nuestras funcionalidades.
            </p>
            <p className="text-sm text-gray-600 text-center leading-relaxed mt-2">
              Gracias por tu paciencia
            </p>
            <section className="mt-4">
              <PageRedirect text="Ir al mesón Digital" url="/home" />
            </section>
          </div>
        </div>
      </main>
    </>
  );

  {
    /*return (
    <>
      <div>
        <Header />
      </div>
      <main className="min-h-screen h-auto bg-white dark:text-black">
        <div className="flex justify-center p-8">
          <div>
            <div>
              <label>
                <span>Paso </span>
                <span className="font-bold">5 </span>
                <span>de </span>
                <span className="font-bold">5</span>
              </label>
              <section className="mt-2">
                <h1 className="font-bold text-xl">
                  Elige como deseas pagar tu plan
                </h1>
              </section>
              <section>
                <h1 className="font-bold mt-5 mb-2 text-base">Tu plan</h1>
                <CardPlanHorizontal plan={planSelected} />
              </section>
              <h1 className="text-lg mt-14 mb-6">
                Métodos de pago disponibles
              </h1>
              <section className="flex justify-center">
                <TransbankPayment/>
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
      </main>
    </>
  );*/
  }
}

export default Page;
