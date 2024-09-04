import { Quotation } from "@prisma/client";
import { ButtonFilter } from "../ui/filters/Btn-filter";
import { Filter } from "../ui/filters/Filter";
import { NavBarFilter } from "../ui/navbar/Filter-nav";
import { ModalGeneral } from "../ui/modals/Modal-general";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NoResultsQuotation } from "../ui/alerts/noResults/QuotationNoResultsFilter";
import { NoQuoteResultsFilter } from "@/libs/messageAlerts";
import { CardGridQuotation } from "../ui/grids/Card-grid-quotation";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { DesingHeaderDown } from "../ui/header/Desing-header-down";
import { IoTimeOutline } from "react-icons/io5";
import PageRedirect from "../ui/buttons/Page-redirect";

interface QuotationWithCity extends Quotation {
  city: {
    name: string;
  };
  images: {
    url: string;
  }[];
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

async function LoadCarBrand({ email }: { email: string }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/" + email,
    {
      cache: "no-cache",
      headers: {
        Pragma: "no-cache",
      },
    }
  );
  const { CompanyCardBrands } = await res.json();
  return { CompanyCardBrands };
}

async function loadQuotes() {
  const headersList = headers();
  const referer = headersList.get("cookie");
  console.log(referer);

  const requestHeaders: HeadersInit = referer ? { Cookie: referer } : {};

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/quotes", {
    method: "GET",
    cache: "no-cache",
    headers: requestHeaders,
  });
  const data = await res.json();
  return data;
}

async function Page() {
  const session = await getServerSession();
  let email = session?.user?.email?.toString();

  email = email || "";

  const user = await LoadCarBrand({ email });
  let carBrands = user.CompanyCardBrands;

  const rubric = getCookie("selectedRubric", { cookies });
  const city = getCookie("selectedCity", { cookies });
  const cars = getCookie("selectedCars", { cookies });

  const carsArray = JSON.parse(cars?.valueOf() || "[]");
  const citiesArray = JSON.parse(city?.valueOf() || "[]");

  let quotes = await loadQuotes();
  const company = await loadVerify();

  quotes = quotes.filter((quote: QuotationWithCity) => {
    const rubricMatch = rubric ? quote.spareType === rubric.toString() : true;

    const cityMatch =
      citiesArray.length > 0 ? citiesArray.includes(quote.idCity) : true;

    const carsMatch =
      carsArray.length > 0 ? carsArray.includes(quote.carBrand) : true;

    return rubricMatch && cityMatch && carsMatch;
  });

  if (company.companyStatus === 1) {
    return (
      <>
        <DesingHeaderDown titulo="MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES" />

        <div className="min-h-screen bg-white p-6 md:p-10">
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
                <PageRedirect text="Verificar Empresa" url="/verificar-empresa"/>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (company.companyStatus === 2) {
    return (
      <>
        <DesingHeaderDown titulo="MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES" />

        <div className="min-h-screen bg-white p-6 md:p-10 text-black dark:text-black">
          <div className="flex flex-row w-full justify-center">
            <div className="md:mx-10 p-6 text-center w-full md:w-2/5 bg-white shadow-md rounded-lg">
              <div className="flex justify-center mb-4">
                <IoTimeOutline className="text-4xl text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                Empresa en proceso de verificación
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Estamos revisando los documentos que nos has enviado de tu
                empresa para asegurarnos de que todo esté en orden. Este proceso
                puede tardar hasta 24 horas. Una vez que tu empresa esté
                verificada, podrás acceder a todas las funcionalidades.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DesingHeaderDown titulo="MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES" />

      <div className="min-h-screen bg-white p-6 md:p-10">
        <div className="flex flex-row justify-center md:justify-start">
          <div className="w-56 bg-gradient-to-tr from-gray-300 to-custom-gray p-4 rounded-md hidden md:block">
            <section id="filter">
              <Filter
                className="flex flex-row items-center text-white"
                carBrands={carBrands}
              />
            </section>
          </div>
          <section>
            <NavBarFilter carBrands={carBrands} />
          </section>
          <div className="md:mx-10">
            <section className="w-full flex justify-between md:hidden">
              <ButtonFilter />
            </section>
            <CardGridQuotation quotes={quotes} />
            {quotes.length === 0 && (
              <NoResultsQuotation message={NoQuoteResultsFilter.message} />
            )}
          </div>
        </div>
        <ModalGeneral />
      </div>
    </>
  );
}

export default Page;
