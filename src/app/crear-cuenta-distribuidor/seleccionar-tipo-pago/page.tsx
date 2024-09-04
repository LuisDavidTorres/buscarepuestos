import Header from "@/app/ui/header/Header";
import { CardPlanHorizontal } from "@/app/ui/cards/Plan-horizontal";
import { SupportInformation } from "@/app/ui/ListComponents/Support-information";
import { TransbankPayment } from "@/app/ui/transbank/Transbank-payment";
import Link from "next/link";
import PageRedirect from "@/app/ui/buttons/Page-redirect";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

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
  console.log(data.subscription)
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
          <div className="max-w-md text-center bg-white rounded-lg shadow-lg p-10 transition-transform transform hover:scale-105">
            <section>
              <h1 className="font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-custom-green to-teal-400">
                ¡Próximamente disponible!
              </h1>
              <p className="mt-6 text-lg">
                Muy pronto podrás adquirir bolsas virtuales de clics en nuestra
                plataforma.
              </p>
              <p className="mt-4 text-lg">
                Anunciaremos la fecha de lanzamiento en breve. ¡Mantente atento!
              </p>
              <section className="text-3xl flex justify-center mt-4 space-x-4">
                <a href="https://www.instagram.com/buscarepuestos.cl" target="_blank"><FaInstagram className="hover:cursor-pointer hover:text-black/50"/></a>
                <a href="https://www.facebook.com/buscarepuestos.cl" target="_blank"><FaFacebookSquare className="hover:cursor-pointer hover:text-black/50"/></a>
              </section>
              <section className="mt-6">
                <PageRedirect text="Ir al Home" url="/home" />
              </section>
            </section>
          </div>
        </div>
      </main>
    </>
  );
  

  {/*return (
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
  );*/}
}

export default Page;
