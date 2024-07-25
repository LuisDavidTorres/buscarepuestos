"use client";

import { UserQuotation } from "@prisma/client";
import { formatDate } from "@/libs/dateUtils";
import { formatNameSpareType } from "@/libs/formatName";
import dataCars from "@/app/data/dataCars";
import SelecTelArea from "@/app/ui/forms/Selet-tel-area";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { formatMoneyString } from "@/libs/moneyutils";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useState } from "react";
import { formatNameIdCar } from "@/libs/formatName";

interface QuotationFull extends UserQuotation {
  quotation: {
    city: {
      name: string;
    };
    date: string;
    idCar: string;
    carBrand: number;
    vehicleYear: number;
    spareName: string;
    spareType: string;
    details: string;
    dateQuotation: string;
    contactName: string;
    contactNumber: string;
  };
}

export function QuotationFull({ quoteUser }: { quoteUser: QuotationFull }) {
  const carBrandName = dataCars.find(
    (car) => car.value === quoteUser.quotation.carBrand
  )?.label;

  const [areaCode, setAreaCode] = useState("+56");
  const [price, setPrice] = useState<Number>(Number(quoteUser.price));
  const [priceFormat, setPriceFormat] = useState("");
  const [sellerPhone, setSellerPhone] = useState(quoteUser.sellerPhone);
  const [sellerName, setSellerName] = useState(quoteUser.sellerName);
  const [sellerLastName, setSellerLastName] = useState(
    quoteUser.sellerLastName
  );
  const [sentButton, setSentButton] = useState(quoteUser.sent);
  const [sent, setSent] = useState(quoteUser.sent);
  const [errors, setErrors] = useState({ sellerPhone: "", price: "" });

  const [isSending, setIsSending] = useState(false);

  const formatPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueSimpleFormat = e.target.value.replace(/[^0-9]/g, "");
    const inputValue = formatMoneyString(inputValueSimpleFormat);
    setPriceFormat(inputValue);
    setPrice(Number(inputValue.replace(/[^0-9]/g, "")));
    validatePrice();
  };

  const validatePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerPhone(e.target.value);
    const Phone = areaCode + e.target.value;
    console.log(Phone);
    try {
      const phoneNumber = parsePhoneNumberFromString(
        Phone,
        areaCode as CountryCode
      );
      if (phoneNumber?.isValid() === false || phoneNumber === undefined) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sellerPhone: "Número de teléfono inválido",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          sellerPhone: "",
        }));
      }
      return phoneNumber ? phoneNumber.isValid() : false;
    } catch (error) {
      console.error("Error al validar el número de teléfono:", error);
      return false;
    }
  };

  const validatePrice = () => {
    if (
      price.toString().startsWith("0") ||
      Number(price) < 1 ||
      /^0+$/.test(price.toString())
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Ingrese un precio válido",
      }));
      return true;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "",
      }));
      return false;
    }
  };

  const habdleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //ver si hay errores en array de errores
    if (errors.sellerPhone || errors.price) {
      alert("por favor corrija los errores en el formulario");
      return;
    }

    setIsSending(true);

    const req = {
      id: quoteUser.id,
      price,
      sellerName,
      sellerLastName,
      sellerPhone: areaCode + sellerPhone,
    };

    try {
      const res = await fetch("/api/quotes/" + quoteUser.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (res.status === 200) {
        setSentButton(true);
        setSent(true);
      }
    } catch (e) {
      console.error("Ha ocurrido un error al enviar la cotización");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col max-[360px]:px-4 px-10 py-5 w-auto h-auto shadow-2xl justify-start rounded-md text-neutral-900">
      <div className="space-y-3 overflow-x-auto">
        <div className="flex flex-row">
          <label className="flex mr-1 whitespace-nowrap">
            Fecha de Solicitud:
          </label>
          <p className="whitespace-nowrap flex-shrink-0 font-bold">
            {formatDate(quoteUser.quotation.dateQuotation)}
          </p>
        </div>
        <h1 className="font-bold">Información de Cliente:</h1>
        <div className="flex flex-row flex-wrap">
          <label className="flex mr-1">Nombre:</label>
          <h1 className="break-all">{quoteUser.quotation.contactName}</h1>
        </div>
        <div className="flex flex-row">
          <label className="flex mr-1">Teléfono:</label>
          <h1>{quoteUser.quotation.contactNumber}</h1>
        </div>
        <div className="flex flex-row">
          <label className="flex mr-1">Región:</label>
          <h1>{quoteUser.quotation.city.name}</h1>
        </div>
        <hr className="xl:hidden"></hr>
        <h1 className="font-bold">Información del Vehículo:</h1>
        <div className="flex flex-row">
          <label className="flex mr-1">Marca:</label>
          <p>{carBrandName}</p>
        </div>
        <div className="flex flex-row">
          <label className="flex mr-1">Año:</label>
          <p>{quoteUser.quotation.vehicleYear}</p>
        </div>
        <div className="flex flex-row">
          <label className="flex mr-1">
            {formatNameIdCar(quoteUser.quotation.idCar.length)}:
          </label>
          <p>
            {quoteUser.quotation.idCar ? quoteUser.quotation.idCar : "N/A"}
          </p>
        </div>
        <hr className="xl:hidden mt-4"></hr>
        <h1 className="font-bold">Información del Repuesto:</h1>
        <div className="flex flex-row">
          <label className="flex mr-1">Repuesto:</label>
          <p className="font-bold">{quoteUser.quotation.spareName}</p>
        </div>
        <div className="flex flex-row">
          <label className="flex mr-1 whitespace-nowrap">
            Tipo de Repuesto:
          </label>
          <p className="font-bold whitespace-nowrap flex-shrink-0">
            {formatNameSpareType(quoteUser.quotation.spareType)}
          </p>
        </div>
      </div>
      <form onSubmit={habdleSubmit}>
        <section className="space-y-2 mt-6">
          <p className="font-bold">Precio Repuesto (Con IVA)</p>
          <div className="flex flex-row items-center">
            <label className="mr-4">Precio</label>
            {sent ? (
              <div className="relative">
                <input
                  className="border-2 rounded-md h-9 px-1 pl-6 pr-2 text-slate-400 cursor-not-allowed w-11/12"
                  disabled
                  value={formatMoneyString(price?.toString())}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400">
                    <MdOutlineAttachMoney />
                  </i>
                </div>
              </div>
            ) : (
              <div className="flex flex-row">
                <div className="relative">
                  {" "}
                  <input
                    className="border-2 rounded-md h-9 px-2 pl-6 pr-2 w-11/12 [&::-webkit-inner-spin-button]:appearance-none"
                    type="text"
                    value={priceFormat}
                    onChange={formatPrice}
                    maxLength={11}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope">
                      <MdOutlineAttachMoney />
                    </i>
                  </div>
                </div>
              </div>
            )}
          </div>
          {errors.price && (
            <p className="text-red-500 mx-16 text-xs md:text-sm">
              {errors.price}
            </p>
          )}
          <p className="font-bold">Datos Vendedor</p>
          <div className="flex flex-row items-center">
            <label className="mr-1">Nombre</label>
            {sent ? (
              <input
                className="border-2 rounded-md h-9 px-1 text-gray-500w-3/4 text-slate-400 cursor-not-allowed w-3/4"
                disabled
                value={sellerName?.toString()}
              />
            ) : (
              <input
                className="border-2 rounded-md h-9 px-1 w-3/4"
                type="text"
                placeholder="Tu nombre"
                maxLength={30}
                onChange={(e) => setSellerName(e.target.value)}
                required
              />
            )}
          </div>
          <div className="flex flex-row items-center">
            <label className="mr-1">Apellido</label>
            {sent ? (
              <input
                className="border-2 rounded-md h-9 px-1 text-gray-500w-3/4 text-slate-400 cursor-not-allowed w-3/4"
                disabled
                value={sellerLastName?.toString()}
              />
            ) : (
              <input
                className="border-2 rounded-md h-9 px-1 w-3/4"
                type="text"
                placeholder="Tu apellido"
                maxLength={30}
                onChange={(e) => setSellerLastName(e.target.value)}
                required
              />
            )}
          </div>
          <div className="flex flex-row">
            <SelecTelArea
              setCode={setAreaCode}
              clases="sm:w-21 h-9 border-2 rounded-s-md w-16"
            />
            {sent ? (
              <input
                className="border-2 rounded-e-md px-1 2xl:w-62 text-slate-400 cursor-not-allowed w-3/4"
                placeholder="Numero de teléfono"
                disabled
                value={sellerPhone}
              />
            ) : (
              <input
                type="tel"
                className="border-2 rounded-e-md px-1 w-3/4 [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Numero de teléfono"
                maxLength={15}
                onChange={validatePhoneNumber}
                required
              />
            )}
          </div>
          {errors.sellerPhone && (
            <p className="text-red-500 mx-16 text-xs md:text-sm">
              {errors.sellerPhone}
            </p>
          )}
        </section>
        <div className="my-4 flex justify-end">
          <button
            className={`rounded-md h-9 mx-3 ${
              sentButton
                ? "bg-gray-400 text-gray-600 cursor-not-allowed w-44"
                : isSending
                ? "bg-yellow-500 hover:bg-yellow-400 text-white w-40"
                : "bg-custom-green hover:bg-green-500 text-white w-32"
            }`}
            disabled={sentButton || isSending}
          >
            {isSending
              ? "Enviando..."
              : sentButton
              ? "Propuesta ya enviada"
              : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}
