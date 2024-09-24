"use client";

import { useState } from "react";
import SelecTelArea from "./Selet-tel-area";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import SelecCity from "./Select-city";
import dataCars from "@/app/data/dataCars";
import Link from "next/link";
import dataYears from "@/app/data/dataYears";
import { useEffect } from "react";
import { useAppContext } from "@/context";
import { quoteCreated } from "@/libs/messageModal";
import { uploadFile } from "@/firebase/firebase.config";
import { GrGallery } from "react-icons/gr";
import { IoCameraOutline } from "react-icons/io5";
import CreatableSelect from "react-select/creatable";
import dataCarsMakeAndModel from "@/app/data/dataCarsMakeAndModel";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import dataSparePartsType from "../../data/dataSparePartsType";

type OptionType = {
  value: string;
  label: string;
};

export function Create_quotation() {
  const [idCar, setIdcar] = useState("");
  const [spareName, setSpareName] = useState("");
  const [spareType, setSpareType] = useState("original");
  const [contactName, setContactName] = useState("");
  const [areaCode, setAreaCode] = useState("+56");
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [carBrand, setCarBrand] = useState<number>();
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([]);
  const [carModel, setCarModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState<number>(
    new Date().getFullYear()
  );
  const [idCity, setCity] = useState<number>();
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errors, setErrors] = useState({ contactNumber: "", contactEmail: "" });
  const animatedComponents = makeAnimated();
  const { toggleModalGeneral, setMessageModalGeneral } = useAppContext();

  const MAX_FILES = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    setIdcar(inputValue);
  };

  const validatePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(e.target.value);
    const Phone = areaCode + e.target.value;

    try {
      const phoneNumber = parsePhoneNumberFromString(
        Phone,
        areaCode as CountryCode
      );

      let numberWithout9 = e.target.value.substring(1);

      const validateChilePhone =
        (areaCode === "+56" && !e.target.value.startsWith("9")) ||
        numberWithout9.startsWith("0") ||
        e.target.value.length < 7 ||
        (e.target.value.length > 7 && /0000/.test(numberWithout9));

      if (
        phoneNumber?.isValid() === false ||
        phoneNumber === undefined ||
        validateChilePhone
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactNumber: "Número de teléfono inválido",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactNumber: "",
        }));
      }
      return phoneNumber ? phoneNumber.isValid() : false;
    } catch (error) {
      console.error("Error al validar el número de teléfono:", error);
      return false;
    }
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactEmail(e.target.value);

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(e.target.value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactEmail: "Email no valido",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contactEmail: "",
      }));
    }
  };

  useEffect(() => {
    const options: OptionType[] = carBrand
      ? dataCarsMakeAndModel.find((item) => item.id === carBrand)?.options || []
      : [];
    setFilteredOptions(options);
    setCarModel("");
  }, [carBrand]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;

    if (filesList) {
      if (filesList.length > MAX_FILES) {
        alert("Solo se permiten un máximo de 5 imágenes");
      }

      const selectedFiles = Array.from(filesList).slice(0, MAX_FILES);
      setFiles(selectedFiles);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);

    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (errors.contactNumber || errors.contactEmail) {
      return;
    }

    setButtonDisabled(true);

    const { downloadUrls } = await uploadFile(files);

    const res = {
      idCar,
      spareName,
      spareType,
      contactName,
      contactNumber: areaCode + contactNumber,
      contactEmail,
      carBrand,
      carModel,
      vehicleYear,
      idCity,
      details,
      URLs: downloadUrls,
    };

    if (res.URLs.length === 0) {
      res.URLs.push(
        "https://firebasestorage.googleapis.com/v0/b/busca-repuestos-cf287.appspot.com/o/ImageDefaultQuote.png?alt=media&token=fd1e26e9-9512-49f4-ae2f-cb21dfaa3fcc"
      );
    }

    try {
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });

      if (response.ok) {
        setMessageModalGeneral(quoteCreated);
        toggleModalGeneral();
        scrollTo(0, 0);
      } else {
        console.error("Error al enviar datos");
      }

      setButtonDisabled(false);
    } catch (error) {
      console.error("Error al crear la cotización");
    }
  };

  useEffect(() => {
    if (!files) return;

    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }

    const objectURLs = tmp;
    setPreviews(objectURLs);

    return () => {
      for (let i = 0; i < objectURLs.length; i++) {
        URL.revokeObjectURL(objectURLs[i]);
      }
    };
  }, [files]);

  return (
    <menu className="flex flex-col min-[1384px]:flex-row w-full dark:text-black">
      <div className="flex justify-center border-2 h-auto w-auto p-5 shadow-md rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row sm:space-x-9 md:space-x-28 lg:space-x-32 2xl:space-x-32 mb-5 space-x-9 font-bold text-lg">
            <h1 className="font-bold text-base text-gray-600">
              INFORMACIÓN DEL REPUESTO
            </h1>
            <h1 className="hidden sm:block font-bold text-base text-gray-600">
              INFORMACIÓN DE CONTACTO
            </h1>
          </div>
          <div>
            <h1 className="text-red-600 text-xs mb-5">
              Campos obligatorios (*)
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-8 ">
            <section className="flex flex-col space-y-5  min-[640px]:w-6/12">
              <label
                id="label-replacement"
                htmlFor="replacement"
                className="flex flex-row space-x-1"
              >
                {" "}
                <p>Nombre del Repuesto</p>
                <p className="text-red-600 ">*</p>
              </label>
              <input
                id="replacement"
                name="replacement"
                type="text"
                placeholder="Repuesto"
                onChange={(e) => setSpareName(e.target.value)}
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
              ></input>

              <label
                id="label-replacement-type"
                htmlFor="replacement-type"
                className="flex flex-row space-x-1"
              >
                {" "}
                <p>Tipo</p>
                <p className="text-red-600 ">*</p>
              </label>
              {/*<select
                name="replacement-type"
                id="replacement-type"
                onChange={(e) => setSpareType(e.target.value)}
                className="border-2 rounded-md h-9"
              >
                <option value="original">Original</option>
                <option value="alternative">Alternativo</option>
                <option value="originalandalternative">
                  Orignal o Alternativo
                </option>
              </select>*/}
              <Select
                instanceId={"replacement-type"}
                className="rounded-md h-9"
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={[]}
                options={dataSparePartsType}
                isSearchable={false}
                placeholder="Tipo"
                required
                onChange={(e) => setSpareType((e as { value: string }).value)}
              />
              <h1 className="font-bold text-base text-gray-600">
                INFORMACIÓN DE VEHÍCULO
              </h1>

              <label id="label-car-brand" className="flex flex-row space-x-1">
                <p>Marca</p>
                <p className="text-red-600 ">*</p>
              </label>
              <SelecCarBrand
                setCar={setCarBrand}
                animatedComponents={animatedComponents}
              />

              <label id="label-car-model" className="flex flex-col space-x-1">
                <div className="flex items-center space-x-2">
                  <p>Modelo</p>
                  <p className="text-red-600 ">*</p>
                  <p className="text-xs text-gray-500 italic ml-2">
                    (Escriba el Modelo)
                  </p>
                </div>
              </label>
              {/*<CreatableSelect
                instanceId={"select-car-model"}
                className="w-full"
                isClearable
                required
                placeholder="Modelo"
                formatCreateLabel={(inputValue) => `Registrar "${inputValue}"`}
                noOptionsMessage={() => "Modelo no encontrado"}
                options={filteredOptions}
                value={carModel ? { value: carModel, label: carModel } : null}
                onChange={(e) => setCarModel((e as { value: string }).value)}
              />*/}
              <input
                id="replacement"
                name="replacement"
                type="text"
                placeholder="Modelo"
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  setCarModel(e.target.value);
                }}
              />

              <label id="label-car-year" className="flex flex-row space-x-1">
                <p>Año</p>
                <p className="text-red-600 ">*</p>
              </label>
              <Select
                instanceId={"vehicle-year"}
                className="rounded-md h-9"
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={[]}
                options={dataYears}
                noOptionsMessage={() => "Año no encontrado"}
                placeholder="Año"
                required
                onChange={(e) => setVehicleYear((e as { value: number }).value)}
              />
              {/*<select
                name="vehicle-year"
                id="vehicle-year"
                onChange={(e) => setVehicleYear(parseInt(e.target.value))}
                className="border-2 rounded-md h-9"
              >
                {dataYears.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>*/}

              <div className="flex flex-row items-center">
                <label
                  id="label-car-id"
                  className="flex items-center"
                  htmlFor="id-car"
                >
                  <p>VIN</p>
                  <p className="mx-2 text-xs text-gray-500 italic">
                    (Opcional)
                  </p>
                </label>
                <section className="min-[1384px]:hidden">
                  <Link href="/crear-cotizacion#infoVni">
                    <p className="text-sm text-blue-800 hover:underline">
                      ¿Qué es?
                    </p>
                  </Link>
                </section>
              </div>
              <input
                type="text"
                id="id-car"
                name="id-car"
                value={idCar}
                placeholder="Identificador"
                pattern="(^[A-HJ-NPR-Z0-9]{17}$)"
                title="Por favor, introduce un VIN válido. Formato de ejemplo: 1G1RC6E42BUXXXXXX"
                onChange={handleInputChange}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
              ></input>

              <div className="border-2 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <label className="flex items-center" htmlFor="fileimg">
                  <p className="font-bold">Adjuntar Imagenes</p>
                  <p className="mx-2 text-xs text-gray-500 italic">
                    (Opcional)
                  </p>{" "}
                </label>
                <div className="flex items-center justify-center w-full mt-4">
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-white hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:to-white">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <section className="flex items-center space-x-1">
                        {" "}
                        <IoCameraOutline className="text-2xl" />
                        <GrGallery className="text-lg" />
                      </section>

                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>Utiliza tu Cámara</span> o Galería
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      type="file"
                      id="fileimg"
                      accept="image/png, image/jpeg"
                      className="w-32 md:w-auto mt-1 hidden"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="flex overflow-x-auto w-full md:w-96">
                {previews.map((pic, index) => (
                  <div key={index} className="flex-shrink-0 mr-4">
                    <img
                      src={pic}
                      alt="Imagen de repuesto"
                      className="w-40 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="mt-1 text-sm text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <h1 className="sm:hidden mt-10 font-bold text-base text-gray-600">
              INFORMACIÓN DE CONTACTO
            </h1>

            <section className="flex flex-col space-y-5 mt-5 sm:mt-0 min-[773px]:w-full">
              <label
                id="label-contact-name"
                htmlFor="contact-name"
                className="flex flex-row space-x-1"
              >
                {" "}
                <p>Nombre</p>
                <p className="text-red-600 ">*</p>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Nombre y Apellidos"
                onChange={(e) => setContactName(e.target.value)}
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
              ></input>

              <label
                id="label-contact-numer"
                className="flex flex-row space-x-1"
              >
                {" "}
                <p>N° Teléfono</p>
                <p className="text-red-600 ">*</p>
              </label>
              <div className="flex flex-row space-x-2">
                <SelecTelArea
                  setCode={setAreaCode}
                  clases="sm:w-21 h-9 border-2 rounded-md w-16"
                />
                <input
                  id="contact-number"
                  type="tel"
                  placeholder="Celular"
                  onChange={validatePhoneNumber}
                  required
                  className="appearance-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
                ></input>
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.contactNumber}
                </p>
              )}

              <label
                id="label-contact-email"
                htmlFor="contact-email"
                className="flex flex-row space-x-1"
              >
                <p>Email</p>
              </label>
              <input
                id="contact-email"
                name="contact-email"
                type="email"
                placeholder="Email"
                onChange={validateEmail}
                autoComplete="email"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
              ></input>
              {errors.contactEmail && (
                <p className="text-red-500 text-xs md:text-sm">
                  {errors.contactEmail}
                </p>
              )}

              <label id="label-zona" className="flex flex-row space-x-1">
                {" "}
                <p>Región</p>
                <p className="text-red-600 ">*</p>
              </label>
              <SelecCity setCity={setCity} />
            </section>
          </div>
          <div className="flex flex-row mt-10 mb-10 space-x-2 text-sm items-start justify-center sm:justify-start">
            <input
              id="terminos"
              name="terminos"
              type="checkbox"
              required
              className="mt-1"
            />
            <label
              id="label-terms"
              htmlFor="terminos"
              className="space-x-1 flex flex-col space-y-1 sm:flex-row sm:space-x-1 sm:space-y-0"
            >
              <p className="inline">Estoy de acuerdo con los</p>
              <Link
                href="/terminos"
                target="_blank"
                className="no-underline hover:underline text-blue-700 inline"
              >
                Términos y Condiciones
              </Link>
            </label>
          </div>

          <section className="mt-3 flex justify-center">
            {buttonDisabled ? (
              <button
                disabled
                type="button"
                className="p-2 bg-green-600 hover:bg-green-500 w-28 text-white rounded-md items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  ></path>
                </svg>
                Enviando
              </button>
            ) : (
              <button className="p-2 bg-custom-green hover:bg-green-500 w-28 text-white rounded-md">
                Enviar
              </button>
            )}
          </section>
        </form>
      </div>

      <div className="p-1 py-5 min-[1384px]:px-10 min-[1384px]:w-2/4 xl:px-16 min-[1384px]:py-0">
        <Details_help />
      </div>
    </menu>
  );
}

function SelecCarBrand({
  setCar,
  animatedComponents,
}: {
  setCar: (code: number) => void;
  animatedComponents: any;
}) {
  const sortedDataCars = [...dataCars];

  sortedDataCars.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <>
      <Select
        className="rounded-md h-9 w-full"
        instanceId={"car-brand"}
        closeMenuOnSelect={true}
        components={animatedComponents}
        options={sortedDataCars}
        noOptionsMessage={() => "Marca no encontrada"}
        placeholder="Marca"
        required
        onChange={(e) => setCar((e as { value: number }).value)}
      />

      {/*<select
        name="car-brand"
        id="car-brand"
        onChange={(e) => setCar(parseInt(e.target.value))}
        required
        className="border-2 rounded-md h-9 w-full"
      >
        {sortedDataCars.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>*/}
    </>
  );
}

function Details_help() {
  return (
    <div id="infoVni">
      <h1 className="font-bold">¿Que es el VIN?</h1>
      <p className="mt-2">
        Número de Identificación del Vehículo, es un identificador único que se
        asigna a cada vehículo.
      </p>
      <h1 className="font-bold mt-5">¿Por que sugerimos el VIN?</h1>
      <p className="mt-2">
        Los repuestos pueden variar significativamente entre diferentes modelos,
        incluso dentro de una misma marca de automóviles, debido a las
        diferencias en el diseño y la especificación. Proporcionar el VIN
        asegura que se obtengan los repuestos correctos, lo que ahorra tiempo y
        evita problemas de compatibilidad.
      </p>
      <h1 className="font-bold mt-5">¿Dónde puedo encontrar el VIN?</h1>
      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-col mt-2 md:space-x-1 lg:space-x-0 xl:space-x-0">
        <p>El VIN consta de 17 caracteres alfanuméricos.</p>
        <div className="flex xl:flex-row space-x-1">
          <label className="break-all">
            <span className="font-bold md:mt-0">Ejemplo de Formato:</span>{" "}
            1G1RC6E42BUXXXXXX
          </label>
        </div>
      </div>

      <ul className="list-disc pl-5 space-y-2 mt-3">
        <li>Puedes localizar el número en el padrón del vehículo.</li>
        <li>En el Parabrisas, en la esquina inferior izquierda.</li>
        <li>
          Abriendo el Capó, lo encontrarás en la parte frontal del motor o en el
          marco posterior.
        </li>
        <li>En el Chasis, inmediatamente arriba de las ruedas delanteras.</li>
        <li>Puerta del Conductor, en el marco de la puerta.</li>
      </ul>
      <h1 className="font-bold mt-5">
        ¿Por que necesitamos tu informacion de contacto?
      </h1>
      <p className="mt-2">
        Para que los distribuidores respondan tu solicitud de cotización.
      </p>
      <p className="mt-5">
        <strong className="font-bold">Fotografías del Repuesto:</strong> Las
        utilizamos para que el Distribuidor identifique la pieza fácil y
        rápidamente.
      </p>

      <p className="mt-5">
        <strong className="font-bold">Fotografía del VIN:</strong> Sugerimos
        incluir en las tomas una fotografía del VIN para corroborar
        transcripción manual.
      </p>
      <p className="mt-5">
        Para mayor información puedes dirigirte a nuestros Términos, Condiciones
        y Políticas de Privacidad o escribirnos a contacto@buscarepuestos.cl.
      </p>
      <section className="p-2 border rounded-md mt-5 bg-black/10">
        <h1 className="font-bold">
          ¿Cuanto tiempo estara visible mi cotización?
        </h1>

        <p className="mt-2">
          Las cotizaciones estarán disponibles por un período de 72 horas en el
          Mesón Digital. Te invitamos a seguir cotizando.
        </p>
      </section>

      <p className="mt-5 font-bold flex justify-end">
        Equipo Buscarepuestos.cl
      </p>
    </div>
  );
}
