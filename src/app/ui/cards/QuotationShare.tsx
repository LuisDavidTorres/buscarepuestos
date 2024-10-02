"use client";

import { formatNameSpareType } from "@/libs/formatName";
import { formatNameIdCar } from "@/libs/formatName";
import { formatDate } from "@/libs/dateUtils";
import dataCars from "@/app/data/dataCars";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { mesageNoCliks, quoteAlreadyAccepted } from "@/libs/messageModal";

interface quote {
  idCar: number;
  spareName: string;
  idQuotation: number;
  spareType: string;
  carBrandName: string;
  carModel: string;
  carBrand: number;
  vehicleYear: string;
  dateQuotation: string;
  clicks: number;
  city: {
    name: string;
  };
}

export default function QuotationShare({ quote }: { quote: quote }) {
  const Date = formatDate(quote.dateQuotation);
  const { toggleModalGeneral, setMessageModalGeneral } = useAppContext();
  const carBrandName = dataCars.find(
    (car) => car.value === quote.carBrand
  )?.label;
  const { data: session, status } = useSession();
  const router = useRouter();

  const submitAcceptQuote = async () => {
    if (status != "authenticated") {
      router.push("/");
      return;
    }

    try {
      const response = await fetch("/api/checkClicks", {
        method: "POST",
        body: JSON.stringify({ idQuote: quote.idQuotation }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/home/mis-cotizaciones/${data.id}`);
      } else {
        let errorMessage = {};

        if (response.status === 404) {
          errorMessage = mesageNoCliks;
        } else if (response.status === 403) {
          errorMessage = quoteAlreadyAccepted;
        } else {
          errorMessage = mesageNoCliks;
        }
        setMessageModalGeneral(errorMessage);
        toggleModalGeneral();
      }
    } catch {
      console.error("Ha ocurrido un error al aceptar la cotización");
    }
  };

  return (
    <div>
      <div className="dark:text-black p-6 bg-white dark:bg-white shadow-md rounded-lg">
        <section className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {quote.city.name}
          </h2>
          <p className="text-xl text-gray-500">{Date}</p>
        </section>

        <hr className="border-gray-300 mb-4" />

        <div className="space-y-4 overflow-x-auto scrollbar-thin scrollbar-webkit">
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <span className="whitespace-nowrap font-medium text-gray-600 ">
              Repuesto:
            </span>
            <p className="whitespace-nowrap flex-shrink-0 font-bold text-gray-900">
              {quote.spareName}
            </p>
          </div>

          <div className="flex justify-between items-center bg-gray-50  p-4 rounded-lg">
            <span className="font-medium text-gray-600 ">
              Tipo de Repuesto:
            </span>
            <p className="font-bold text-gray-900 ">
              {formatNameSpareType(quote.spareType)}
            </p>
          </div>

          <div className="flex justify-between items-center bg-gray-50  p-4 rounded-lg">
            <span className="font-medium text-gray-600 ">Marca:</span>
            <p className="font-bold text-gray-900 ">{carBrandName}</p>
          </div>

          <div className="flex justify-between items-center bg-gray-50  p-4 rounded-lg">
            <span className="font-medium text-gray-600 ">Modelo:</span>
            <p className="font-bold text-gray-900 ">{quote.carModel}</p>
          </div>

          <div className="flex justify-between items-center bg-gray-50  p-4 rounded-lg">
            <span className="font-medium text-gray-600 ">Año:</span>
            <p className="font-bold text-gray-900 ">{quote.vehicleYear}</p>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <span className="font-medium text-gray-600">
              {formatNameIdCar(quote.idCar)}:
            </span>
            <p className="text-gray-700 ">
              {quote.idCar ? quote.idCar : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <section className="mt-4">
        {quote.clicks === 0 ? (
          <button
            onClick={submitAcceptQuote}
            className="text-white dark:text-white p-2 bg-custom-green hover:bg-green-600 rounded-md w-full"
          >
            Aceptar
          </button>
        ) : (
          <button disabled className="text-white dark:text-white p-2 bg-custom-gray rounded-md w-full cursor-no-drop">
            Cotización o disponible
          </button>
        )}
      </section>
    </div>
  );
}
