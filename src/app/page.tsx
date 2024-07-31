import { ModalLoginSupplier } from "./ui/home/ModalLoginSupplier";
import { HeaderOut } from "./ui/header/Out";
import { ToEnter } from "./ui/buttons/To-enter";
import { UsageSteps } from "./ui/cards/Usage-steps";
import { IoIosLock } from "react-icons/io";
import { TfiArrowCircleDown } from "react-icons/tfi";
import Image from "next/image";

async function Home() {
  return (
    <>
      <main className="min-h-screen bg-custom-green">
        <HeaderOut />
        <div className="flex flex-col md:justify-center">
          <div
            className="bg-gradient-to-r bg-zinc-700 w-full flex flex-col items-center h-96"
            style={{ boxShadow: "10px 15px 10px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="mt-4 flex flex-col items-center px-1 sm:px-0">
              <div className="w-full text-center">
                <p className="bg-clip-text text-white text-xs sm:text-base">
                  {" "}
                  MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES
                </p>
              </div>
              <section>
                <p className="w-96 mt-4 text-white flex flex-col text-center text-balance opacity-95 text-sm sm:text-base">
                  Simplifica la manera en que se buscan y adquieren repuestos
                  automotrices. Brindamos una experiencia Fácil, Rápida y Segura
                  para Clientes Buscadores y Distribuidores.
                </p>
              </section>
              <div className="w-full">
                <div className="bg-gradient-to-r from-white to-gray-200 w-full h-36 border-l-neutral-500/800 rounded-md p-4 my-6 shadow-2xl">
                  <p className="flex justify-center text-xl dark:text-black">
                    INGRESO
                  </p>
                  <div className="space-x-5 flex justify-items-center justify-center my-8">
                    <ToEnter />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center py-10 select-none xl:mt-16 mt:0">
            <img
              className="drop-shadow-[7px_10px_5px_rgba(0,0,0,0.5)]"
              alt="br-logo"
              width={60}
              height={60}
              src={"/logo-images/br-logo.webp"}
            ></img>
            <section className="mt-8">
              <a href="#usageSteps">
                <TfiArrowCircleDown className="animate-bounce text-white text-3xl hover:cursor-pointer" />
              </a>
            </section>
          </div>

          <div className="relative w-full overflow-hidden select-none">
            <Image
              src={"/images/backgrounds/Fondo_BR_home_index.webp"}
              alt="Busca Repuestos"
              className="w-full"
              width={1920}
              height={400}
              priority={true}
              quality={100}
            />
          </div>
          <div className="bg-gradient-to-r bg-zinc-700 flex justify-center p-12 flex-col items-center space-y-5">
            <h1 className="text-gray-400">PLATAFORMA PROTEGIDA</h1>
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
          <div
            id="usageSteps"
            className="flex flex-col md:flex-row justify-center p-10 gap-8 items-center bg-white"
          >
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

          <div className="flex justify-center absolute my-2 md:my-8">
            <ModalLoginSupplier />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
