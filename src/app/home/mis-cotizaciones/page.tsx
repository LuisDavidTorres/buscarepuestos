import { Filter } from "@/app/ui/filters/Filter";
import { NavBarFilter } from "@/app/ui/navbar/Filter-nav";
import { ButtonFilter } from "@/app/ui/filters/Btn-filter";
import { UserQuotation } from "@prisma/client";
import { CardGridQuotation } from "@/app/ui/grids/Card-grid-quotation";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NoResultsQuotation } from "@/app/ui/alerts/noResults/QuotationNoResultsFilter";
import { NoQuoteResultsFilter } from "@/libs/messageAlerts";
import { getServerSession } from "next-auth";
import { DesingHeaderDown } from "@/app/ui/header/Desing-header-down";

interface QuotationFull extends UserQuotation {
  quotation: {
    city: {
      id: number;
      name: string;
    };
    images: {
      url: string;
    }[];
    date: string;
    idCar: string;
    carBrand: number;
    carModel: string;
    vehicleYear: number;
    spareName: string;
    spareType: string;
    details: string;
    dateQuotation: string;
  };
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
  const { userCarBrandAccepted } = await res.json();
  return { userCarBrandAccepted };
}

async function loadQuotes({ email }: { email: string }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/assignedQuotes/" + email,
    {
      cache: "no-cache",
      headers: {
        Pragma: "no-cache",
      },
    }
  );
  const data = await res.json();
  return data;
}

async function Page() {
  const rubric = getCookie("selectedRubric", { cookies });
  const city = getCookie("selectedCity", { cookies });
  const cars = getCookie("selectedCars", { cookies });

  const carsArray = JSON.parse(cars?.valueOf() || "[]");
  const citiesArray = JSON.parse(city?.valueOf() || "[]");

  const session = await getServerSession();
  let email = session?.user?.email?.toString();

  email = email || "";

  const user = await LoadCarBrand({ email });
  let carBrands = user.userCarBrandAccepted;

  let quotes = await loadQuotes({ email });

  quotes = quotes.filter((quote: QuotationFull) => {
    // Filtrado por rubric (rubro)
    const rubricMatch = rubric
      ? quote.quotation.spareType === rubric.toString()
      : true;

    // Filtrado por city (ciudad)
    const cityMatch =
      citiesArray.length > 0
        ? citiesArray.includes(quote.quotation.city.id)
        : true;

    // Filtrado por cars (coches)
    const carsMatch =
      carsArray.length > 0
        ? carsArray.includes(quote.quotation.carBrand)
        : true;

    // Solo se devuelven las cotizaciones que coincidan con todas las condiciones especificadas
    return rubricMatch && cityMatch && carsMatch;
  });

  return (
    <>
      <DesingHeaderDown titulo="MIS COTIZACIONES" />
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
      </div>
    </>
  );
}

export default Page;
