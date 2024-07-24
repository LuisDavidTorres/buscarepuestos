"use client";

import { useState } from "react";
import SelecTelArea from "./Selet-tel-area";
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

export function Create_quotation() {
  const [idCar, setIdcar] = useState("");
  const [spareName, setSpareName] = useState("");
  const [spareType, setspareType] = useState("original");
  const [contactName, setContactName] = useState("");
  const [areaCode, setAreaCode] = useState("+56");
  const [contactNumber, setContactNumber] = useState("");
  const [carBrand, setCarBrand] = useState<number>(1);
  const [vehicleYear, setVehicleYear] = useState<number>(
    new Date().getFullYear()
  );
  const [idCity, setCity] = useState<number>(1);
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { toggleModalGeneral, setMessageModalGeneral } = useAppContext();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const MAX_FILES = 5;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase();
    setIdcar(inputValue);
  };

  const filteredOptions = carBrand
    ? dataCarsMakeAndModel.find((item) => item.id === carBrand)?.options || []
    : dataCarsMakeAndModel.flatMap((item) => item.options);

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

    setButtonDisabled(true);

    const { downloadUrls } = await uploadFile(files);

    const res = {
      idCar,
      spareName,
      spareType,
      contactName,
      contactNumber: areaCode + contactNumber,
      carBrand,
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
          <div className="flex flex-row sm:space-x-20 md:space-x-40 mb-5 space-x-9 font-bold md:text-lg">
            <h1>Información del Vehículo</h1>
            <h1 className="hidden sm:block">Información de Contacto</h1>
          </div>
          <div>
            <h1 className="text-red-600 text-sm mb-5">
              (*) Campos obligatorios
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-8 ">
            <section className="flex flex-col space-y-5  min-[640px]:w-6/12">
              <label htmlFor="patente" className="flex flex-row space-x-1">
                <p className="text-red-600 ">*</p>
                <p>VIN</p>
              </label>
              <section className="min-[1384px]:hidden">
                <Link href="/crear-cotizacion#infoVni">
                  <p className="text-sm text-blue-800">
                    ¿Por qué es necesario?
                  </p>
                </Link>
              </section>

              <input
                type="text"
                id="id-car"
                name="id-car"
                value={idCar}
                placeholder="Identificador"
                pattern="(^[A-HJ-NPR-Z0-9]{17}$)"
                title="Por favor, introduce un VIN válido. Formato de ejemplo: 1G1RC6E42BUXXXXXX"
                onChange={handleInputChange}
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
              ></input>

              <label htmlFor="repuesto" className="flex flex-row space-x-1">
                {" "}
                <p className="text-red-600 ">*</p>
                <p>Nombre de Repuesto</p>
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
                htmlFor="replacement-type"
                className="flex flex-row space-x-1"
              >
                {" "}
                <p className="text-red-600 ">*</p>
                <p>Tipo</p>
              </label>
              <select
                name="replacement-type"
                id="replacement-type"
                onChange={(e) => setspareType(e.target.value)}
                className="border-2 rounded-md h-9"
              >
                <option value="original">Original</option>
                <option value="alternative">Alternativo</option>
                <option value="originalandalternative">
                  Orignal o Alternativo
                </option>
              </select>

              <label className="flex flex-row space-x-1">
                <p className="text-red-600 ">*</p>
                <p>Marca</p>
              </label>
              <SelecCarBrand setCar={setCarBrand} />

              <label className="flex flex-row space-x-1">
                <p className="text-red-600 ">*</p>
                <div>
                  {" "}
                  <p>Modelo</p>
                  <p className="text-sm">(Si no aparece, puede escribirlo)</p>
                </div>
              </label>
              <CreatableSelect
                className="w-full"
                isClearable
                required
                placeholder="Modelo"
                formatCreateLabel={(inputValue) => `Registrar "${inputValue}"`}
                noOptionsMessage={() => "Modelo no encontrado"}
                options={filteredOptions}
              />

              <label className="flex flex-row space-x-1">
                <p className="text-red-600 ">*</p>
                <p>Año</p>
              </label>
              <select
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
              </select>
              <div className="border-2 p-2 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <label className="flex items-center" htmlFor="fileimg">
                  <p className="font-bold">Adjuntar Imagenes</p>
                  <p className="mx-2 text-sm">(Opcional)</p>{" "}
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

            <h1 className="sm:hidden mt-10 font-bold">
              Información de Contacto
            </h1>

            <section className="flex flex-col space-y-5 mt-5 sm:mt-0 min-[773px]:w-full">
              <label
                htmlFor="nombreContacto"
                className="flex flex-row space-x-1"
              >
                {" "}
                <p className="text-red-600 ">*</p>
                <p>Nombre</p>
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Nombre y Apellidos"
                onChange={(e) => setContactName(e.target.value)}
                required
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
              ></input>

              <label className="flex flex-row space-x-1">
                {" "}
                <p className="text-red-600 ">*</p>
                <p>N° Teléfono</p>
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
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                  className="appearance-none p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
                ></input>
              </div>

              <label className="flex flex-row space-x-1">
                {" "}
                <p className="text-red-600 ">*</p>
                <p>Región</p>
              </label>
              <SelecCity setCity={setCity} />
            </section>
          </div>
          <div className="flex flex-row mt-10 mb-10 space-x-2">
            <label className="flex flex-row space-x-1">
              <p>Acepto</p>
              <Link
                href="/terminos"
                target="_blank"
                className="no-underline hover:underline text-blue-700"
              >
                Términos y Condiciones
              </Link>
            </label>
            <input type="checkbox" required />
          </div>

          <section className="mt-3">
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
        <Details_help></Details_help>
      </div>
    </menu>
  );
}

function SelecCarBrand({ setCar }: { setCar: (code: number) => void }) {
  const sortedDataCars = [...dataCars];

  sortedDataCars.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <>
      <select
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
      </select>
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
      <h1 className="font-bold mt-5">¿Por que necesitamos el VIN?</h1>
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
        Para mayor información puedes dirigirte a nuestros Terminos y
        Condiciones y Política de Privacidad o escribirnos a
        contacto@buscarepuestos.cl.
      </p>
      <p className="mt-5">Éxito!</p>
      <p className="mt-5 font-bold flex justify-end">
        Equipo Buscarepuestos.cl
      </p>
    </div>
  );
}
