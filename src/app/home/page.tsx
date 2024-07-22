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

interface QuotationWithCity extends Quotation {
  city: {
    name: string;
  };
  images: {
    url: string;
  }[];
}

async function LoadCarBrand({ email }: { email: string }) {
  const res = await fetch(
    process.env.NEXT_PLUBLIC_API_URL + "/api/user/" + email,
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
  const nextHeaders = headers();
  const plainHeaders: { [key: string]: string } = {};
  nextHeaders.forEach((value, key) => {
    plainHeaders[key] = value;
  });

  const res = await fetch(process.env.NEXT_PLUBLIC_API_URL + "/api/quotes", {
    method: "GET",
    cache: "no-cache",
    headers: plainHeaders,
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

  quotes = quotes.filter((quote: QuotationWithCity) => {
    // Filtrado por rubric (rubro)
    const rubricMatch = rubric ? quote.spareType === rubric.toString() : true;

    // Filtrado por city (ciudad)
    const cityMatch =
      citiesArray.length > 0 ? citiesArray.includes(quote.idCity) : true;

    // Filtrado por cars (coches)
    const carsMatch =
      carsArray.length > 0 ? carsArray.includes(quote.carBrand) : true;

    // Solo se devuelven las cotizaciones que coincidan con todas las condiciones especificadas
    return rubricMatch && cityMatch && carsMatch;
  });

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
