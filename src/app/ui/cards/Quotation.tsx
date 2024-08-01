"use client";

import { Quotation } from "@prisma/client";
import { formatDate } from "@/libs/dateUtils";
import { LoadButton } from "../buttons/Load-button";
import { formatNameIdCar } from "@/libs/formatName";
import { Carousel } from "flowbite-react";
import { useAppContext } from "@/context";
import { mesageNoCliks, quoteAlreadyAccepted } from "@/libs/messageModal";
import { useRouter } from "next/navigation";
import { formatNameSpareType } from "@/libs/formatName";
import { useState } from "react";
import dataCars from "@/app/data/dataCars";

interface QuotationWithCity extends Quotation {
  city: {
    name: string;
  };
  images: {
    url: string;
  }[];
}

export function CardQuotation({ quote }: { quote: QuotationWithCity }) {
  const Date = formatDate(quote.dateQuotation);
  const { toggleModalGeneral, setMessageModalGeneral } = useAppContext();
  const carBrandName = dataCars.find(
    (car) => car.value === quote.carBrand
  )?.label;
  const idCar = quote.idCar?.length ?? 0;
  const [acceptButton, setAcceptButton] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    setAcceptButton(true);
    try {
      const res = await fetch("/api/checkClicks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quoteId: quote.idQuotation }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/home/mis-cotizaciones/${data.id}`);
      } else {
        let errorMessage = {};
        setAcceptButton(false);

        if (res.status === 404) {
          errorMessage = mesageNoCliks;
        } else if (res.status === 403) {
          errorMessage = quoteAlreadyAccepted;
        } else {
          errorMessage = mesageNoCliks;
        }
        setMessageModalGeneral(errorMessage);
        toggleModalGeneral();
      }
    } catch (error) {
      console.error("Ha ocurrido un error al aceptar la cotización");
    }
  };

  return (
    <div className="border-2 p-5 h-auto w-72 sm:w-80 rounded-md mt-10 sm:mt-0 dark:text-black">
      <section className="flex justify-between mb-4">
        <label className="font-bold">{quote.city.name}</label>
        <label className="font-bold">{Date}</label>
      </section>
      <hr></hr>
      <section className="flex flex-col space-y-4 mt-4 mb-5">
        <div className="overflow-x-auto space-y-4 scrollbar-thin scrollbar-webkit">
          <div className="flex flex-row justify-between space-x-2">
            <label className="whitespace-nowrap">Repuesto:</label>
            <p className="font-bold whitespace-nowrap flex-shrink-0">{quote.spareName}</p>
          </div>
          <div className="flex flex-row justify-between space-x-6">
            <label className="whitespace-nowrap">Tipo de Repuesto:</label>
            <p className="font-bold whitespace-nowrap flex-shrink-0">
              {formatNameSpareType(quote.spareType)}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Marca:</label>
            <p className="font-bold">{carBrandName}</p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Modelo:</label>
            <p className="font-bold">{quote.carModel}</p>
          </div>
          <div className="flex flex-row justify-between">
            <label>Año:</label>
            <p className="font-bold">{quote.vehicleYear}</p>
          </div>
          <div className="flex flex-row justify-between">
            <label>{formatNameIdCar(idCar)}:</label>
            <p>{quote.idCar ? quote.idCar : "N/A"}</p>
          </div>
        </div>
        <div className="h-44">
          <Carousel className="text-black">
            {quote.images.map((s) => (
              <img
                key={quote.idQuotation}
                className="rounded-xl"
                src={s.url}
                alt="imagen"
              />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="mt-14 flex justify-center">
        {acceptButton ? (
          <LoadButton text="Aceptar" />
        ) : (
          <button
            onClick={handleClick}
            className="p-2 bg-custom-green hover:bg-green-700 rounded-md text-white"
          >
            Aceptar
          </button>
        )}
      </section>
    </div>
  );
}
