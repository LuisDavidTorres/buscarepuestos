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





async function Page() {
  const session = await getServerSession();
  let email = session?.user?.email?.toString();

  email = email || "";


  const rubric = getCookie("selectedRubric", { cookies });
  const city = getCookie("selectedCity", { cookies });
  const cars = getCookie("selectedCars", { cookies });

  const carsArray = JSON.parse(cars?.valueOf() || "[]");
  const citiesArray = JSON.parse(city?.valueOf() || "[]");




  return (
    <>
      <DesingHeaderDown titulo="MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES" />

      <div className="min-h-screen bg-white p-6 md:p-10">
        <div className="flex flex-row justify-center md:justify-start">
          <div className="w-56 bg-gradient-to-tr from-gray-300 to-custom-gray p-4 rounded-md hidden md:block">
            <section id="filter">
          
            </section>
          </div>
          <section>
          </section>
          <div className="md:mx-10">
            <section className="w-full flex justify-between md:hidden">
              <ButtonFilter />
            </section>
          
          </div>
        </div>
        <ModalGeneral />
      </div>
    </>
  );
}

export default Page;
