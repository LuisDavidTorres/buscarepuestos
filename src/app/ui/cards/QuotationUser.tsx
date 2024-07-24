"use client";

import { UserQuotation } from "@prisma/client";
import { formatDate } from "@/libs/dateUtils";
import { formatNameIdCar } from "@/libs/formatName";
import { Carousel } from "flowbite-react";
import dataCars from "@/app/data/dataCars";
import { formatNameSpareType } from "@/libs/formatName";
import { useRouter } from "next/navigation";

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
    vehicleYear: number;
    spareName: string;
    spareType: string;
    details: string;
    dateQuotation: string;
  };
}

export function CardQuotationUser({ quote }: { quote: QuotationFull }) {
  const Date = formatDate(quote.quotation.dateQuotation);
  const carBrandName = dataCars.find(
    (car) => car.value === quote.quotation.carBrand
  )?.label;

  const router = useRouter();

  const handleClick = async () => {
    router.push(`/home/mis-cotizaciones/${quote.id}`);
  };

  return (
    <div className="border-2 p-5 h-auto w-80 rounded-md mt-10 sm:mt-0 dark:text-black">
      <section className="flex justify-between">
        <label className="font-bold">{quote.quotation.city.name}</label>
        <label className="font-bold">{Date}</label>
      </section>
      <section className="flex flex-col space-y-4 mt-8 mb-5">
        <div className="flex flex-row justify-between">
          <label>{formatNameIdCar(quote.quotation.idCar.length)}:</label>
          <p className="font-bold">{quote.quotation.idCar}</p>
        </div>
        <div className="flex flex-row justify-between">
          <label>Marca:</label>
          <p>{carBrandName}</p>
        </div>
        <div className="flex flex-row justify-between">
          <label>Año de Fabricación:</label>
          <p>{quote.quotation.vehicleYear}</p>
        </div>
        <div className="flex flex-row justify-between">
          <label>Repuesto:</label>
          <p className="font-bold">{quote.quotation.spareName}</p>
        </div>
        <div className="flex flex-row justify-between">
          <label>Tipo de Repuesto:</label>
          <p className="font-bold">{formatNameSpareType(quote.quotation.spareType)}</p>
        </div>
        <div className="h-44 rounded-md">
          <Carousel className="text-black">
            {quote.quotation.images.map((s) => (
              <img key={s.url} className="rounded-xl" src={s.url} alt="imagen" />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="mt-14 text-center">
        <button
          onClick={handleClick}
          className="p-2 bg-custom-green hover:bg-green-700 rounded-md text-white"
        >
          Ver detalles
        </button>
      </section>
    </div>
  );
}
