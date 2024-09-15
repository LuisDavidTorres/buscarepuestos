import { DashboardHeader } from "@/app/ui/header/Dashboard";
import { CardPlanHorizontal } from "@/app/ui/cards/Plan-horizontal";
import { TransbankPayment } from "@/app/ui/transbank/Transbank-payment";
import { SupportInformation } from "@/app/ui/ListComponents/Support-information";
import Link from "next/link";
import PageRedirect from "@/app/ui/buttons/Page-redirect";
import { headers } from "next/headers";
import { IoTimeOutline } from "react-icons/io5";

interface PageProps {
  searchParams: {
    plan: string;
  };
}

async function loadVerify() {
  const headersList = headers();
  const referer = headersList.get("cookie");

  const requestHeaders: HeadersInit = referer ? { Cookie: referer } : {};

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/verifyCompany",
    {
      method: "GET",
      cache: "no-cache",
      headers: requestHeaders,
    }
  );
  const data = await res.json();
  return data;
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

  const company = await loadVerify();

  if (company.companyStatus === 1) {
    return (
      <div className="min-h-screen bg-white">
        <DashboardHeader />
        <div className="flex justify-center items-center p-8 text-black/60 dark:text-black/60 bg-white">
          <div className="flex flex-row w-full justify-center">
            <div className="md:mx-10 p-6 text-center w-full md:w-2/5 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Verificación de empresa pendiente
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Aún no hemos recibido los documentos necesarios para verificar
                tu empresa.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Por favor, envíalos a la brevedad para que podamos comenzar el
                proceso de revisión.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Recuerda que una vez que recibamos y revisemos los documentos,
                el proceso de verificación puede tardar hasta 24 horas. Te
                notificaremos cuando tu empresa esté verificada y podrás acceder
                a todas las funcionalidades.
              </p>
              <section className="mt-5">
                <PageRedirect
                  text="Verificar Empresa"
                  url="/verificar-empresa"
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (company.companyStatus === 2) {
    return (
      <div className="min-h-screen bg-white">
        <DashboardHeader />
        <div className="flex justify-center items-center p-8 text-black/60 dark:text-black/60 bg-white">
          <div className="flex flex-row w-full justify-center">
            <div className="md:mx-10 p-6 text-center w-full md:w-2/5 bg-white shadow-md rounded-lg">
              <div className="flex justify-center mb-4">
                <IoTimeOutline className="text-4xl text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Proceso de Verificaión de la Empresa
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Estamos revisando los documentos de tu empresa. Esto puede
                tardar hasta 24 horas. En cuanto esté verificada, podrás usar
                todas nuestras funcionalidades.
              </p>
              <p className="text-sm text-gray-600 text-center leading-relaxed mt-2">
                Gracias por tu paciencia
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  {
    return (
      <div className="min-h-screen bg-white">
        <DashboardHeader />
        <div className="flex justify-center p-8 dark:text-black">
          <div>
            <div>
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
}

export default Page;
