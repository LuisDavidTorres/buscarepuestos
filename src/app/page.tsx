import { ModalLoginSupplier } from "./ui/home/ModalLoginSupplier";
import { HeaderOut } from "./ui/header/Out";
import { ToEnter } from "./ui/buttons/To-enter";
import { UsageSteps } from "./ui/cards/Usage-steps";
import { IoIosLock } from "react-icons/io";
import { TfiArrowCircleDown } from "react-icons/tfi";
import Image from "next/image";
import AccordionClientFaq from "./ui/accordions/AccordionClientFaq";
import AccordionDistributorFaq from "./ui/accordions/AccordionDistributorFaq";
import Parallax from "./ui/parallax/Parallax";

async function Home() {
  return (
    <>
      <main className="min-h-screen bg-custom-green">
        <HeaderOut />
        <div className="flex flex-col md:justify-center">
          <section
            className="bg-gradient-to-br from-zinc-700 via-zinc-700 to-zinc-800 p-4 md:p-20 w-full flex flex-col items-center h-auto"
            style={{ boxShadow: "10px 15px 10px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-9 w-full">
              <h1 className="text-wrap font-bold text-white opacity-90 max-[320px]:text-xl text-xl w-full md:w-auto">
                MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES{" "}
              </h1>
              <div className="text-white opacity-90 lg:px-40 xl:px-72 2xl:px-96 space-y-4 text-start md:text-center borde-2">
                <p>
                  Bienvenido a Buscarepuestos.cl, la Plataforma Digital que
                  conecta a Distribuidores Verificados con Clientes Buscadores.
                  Nuestra misión es facilitar la búsqueda y adquisición de
                  repuestos automotrices, ofreciendo un servicio fácil, rápido y
                  seguro.
                </p>
                <p>
                  Aquí encontrarás una amplia variedad de piezas para tu
                  vehículo, originales y alternativas.
                </p>
              </div>
              <section className="sm:space-x-2 flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto">
                <ToEnter />
              </section>
            </div>
          </section>
          <div className="flex flex-col justify-center items-center max-[320px]:py-6 py-9 select-none">
            <img
              className="drop-shadow-[7px_10px_5px_rgba(0,0,0,0.5)]"
              alt="br-logo"
              width={60}
              height={60}
              src={"/logo-images/br-logo.webp"}
            ></img>
            <section className="max-[320px]:mt-6 mt-8">
              <a href="#usageSteps">
                <span className="sr-only">Ver los pasos de uso</span>
                <TfiArrowCircleDown className="animate-bounce text-white text-3xl hover:cursor-pointer" />
              </a>
            </section>
          </div>

          <div className="relative w-full overflow-hidden select-none mt-4">
            <Parallax />
          </div>
          <div className="bg-gradient-to-br from-zinc-700 via-zinc-700 to-zinc-800 flex justify-center p-12 flex-col items-center space-y-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="grey"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="1"
                y="1"
                width="46"
                height="46"
                stroke="grey"
                fill="none"
                strokeWidth="1"
              ></rect>

              <g transform="translate(9, 8)">
                <IoIosLock className="text-3xl text-gray-400" />
              </g>
            </svg>
          </div>
          <section id="usageSteps" className="p-10 items-center bg-white">
            <h2 className="font-bold text-2xl sm:text-3xl text-black/70 mt-24 text-center">
              Pasos para Crear una Cotización
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-14">
              {" "}
              <UsageSteps
                numberStep={"1°"}
                name={"CLIENTE"}
                descrition={"COMPLETE LA COTIZACIÓN Y PRESIONE ENVIAR"}
              />
              <UsageSteps
                numberStep={"2°"}
                name={"PLATAFORMA"}
                descrition={
                  "SU COTIZACIÓN INGRESA AL MESÓN DIGITAL BuscaRepuestos.cl"
                }
              />
              <UsageSteps
                numberStep={"3°"}
                name={"DISTRIBUIDOR"}
                descrition={"DISTRIBUIDORES REGISTRADOS COTIZAN Y RESPONDEN"}
              />
            </div>
          </section>
          <section
            id="frequentQuestions"
            className="w-full bg-white flex flex-col justify-center items-center"
          >
            <h2 className="font-bold text-2xl sm:text-3xl text-black/70 mt-24">
              Preguntas Frecuentes
            </h2>
            <div className="w-4/5 sm:w-3/5 mt-10 mb-10">
              <h2 className="text-lg text-black dark:text-black p-4 underline underline-offset-8 decoration-2 decoration-gray-400/50 dark:decoration-gray-400/50 font-sans">
                Para Buscadores
              </h2>
              <AccordionClientFaq />
            </div>
            <div className="w-4/5 sm:w-3/5 mt-10 mb-16">
              <h2 className="text-lg text-black dark:text-black p-4 underline underline-offset-8 decoration-2 decoration-gray-400/50 dark:decoration-gray-400/50 font-sans">
                Para Distribuidores
              </h2>
              <AccordionDistributorFaq />
            </div>
          </section>

          <div className="flex justify-center absolute my-2 md:my-8">
            <ModalLoginSupplier />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
