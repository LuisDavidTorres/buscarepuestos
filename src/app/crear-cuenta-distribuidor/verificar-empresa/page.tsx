import Header from "@/app/ui/header/Header";
import VeriryCompanyFiles from "@/app/ui/forms/Verify-company-files";
import { headers } from "next/headers";
import PageRedirect from "@/app/ui/buttons/Page-redirect";

async function loadVerify() {
  const headersList = headers();
  const referer = headersList.get("cookie");
  console.log(referer);

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

async function Page() {
  const company = await loadVerify();

  if (company.companyStatus === 3) {
    return (
      <main className="min-h-screen h-auto bg-white dark:text-black">
        <Header />
        <div className="flex justify-center p-8">
          <div className="w-full lg:w-8/12">
            <section className="mt-4 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <h2 className="text-md font-semibold text-gray-800 mb-2">
                    Proceso de Verificación
                  </h2>
                  <span className="bg-green-400 text-white text-xs font-medium px-3 py-1 rounded-md dark:bg-gray-700 border border-green-500">
                    Verificada
                  </span>
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  Tu empresa está verificada
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  if (company.companyStatus === 2) {
    return (
      <>
        <main className="min-h-screen h-auto bg-white dark:text-black">
          <Header />
          <div className="flex justify-center p-8">
            <div className="w-full lg:w-8/12">
              <div className="flex flex-col space-y-2">
                <label>
                  <span>Paso </span>
                  <span className="font-bold">3 </span>
                  <span>de </span>
                  <span className="font-bold">5</span>
                </label>
                <h1 className="text-xl font-bold">Verificación de Empresa</h1>
              </div>
              <section className="mt-4 space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <h2 className="text-md font-semibold text-gray-800 mb-2">
                      Proceso de Verificación
                    </h2>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-md dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                      En Revisión
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Tu empresa está en proceso de verificación, lo cual puede tardar hasta 1 día hábil. Agradecemos tu paciencia mientras revisamos tu información.
                  </p>
                  <p className="text-sm text-center text-gray-700 mt-2">
                    ¡Pronto estarás activo!
                  </p>
                </div>
              </section>
              <section className="flex justify-end mt-5">
                <PageRedirect
                  text="Siguiente"
                  url="/crear-cuenta-distribuidor/planes"
                />
              </section>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen h-auto bg-white dark:text-black">
        <Header />
        <div className="flex justify-center p-8">
          <div className="w-full lg:w-8/12">
            <div className="flex flex-col space-y-2">
              <label>
                <span>Paso </span>
                <span className="font-bold">3 </span>
                <span>de </span>
                <span className="font-bold">5</span>
              </label>
              <h1 className="text-xl font-bold">Verificación de Empresa</h1>
            </div>
            <section className="mt-4 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-md font-semibold text-gray-800 mb-2">
                  Proceso de Verificación
                </h2>
                <p className="text-sm text-gray-700">
                  Como parte de nuestro proceso de verificación, es necesario
                  que suba un documento oficial, como una boleta de servicios
                  (luz, agua, teléfono) o un documento que confirme la propiedad
                  de la empresa.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  Requisitos del Documento
                </h3>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-2">
                  <li>Debe ser reciente (no mayor a 3 meses).</li>
                  <li>
                    Debe contener el nombre de la empresa o del propietario
                    registrado.
                  </li>
                  <li>
                    Debe mostrar claramente la dirección asociada a la empresa.
                  </li>
                </ul>
              </div>
            </section>

            <div className="mt-2">{<VeriryCompanyFiles />}</div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page;
