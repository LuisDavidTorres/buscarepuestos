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
          <section
            className="bg-gradient-to-r p-4 md:p-20 bg-zinc-700 w-full flex flex-col items-center h-auto"
            style={{ boxShadow: "10px 15px 10px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="flex flex-col justify-center items-center gap-4 sm:gap-9 w-full">
              <h1 className="text-wrap font-bold text-white opacity-90 text-2xl w-full md:w-auto">
                Encuentra los repuestos que necesitas{" "}
                <span className="text-slate-200">o Únete como Proveedor</span>
              </h1>
              <div className="text-white opacity-90 lg:px-96 space-y-4 text-start md:text-center borde-2">
                <p>
                  BuscaRepuestos.cl es una plataforma que conecta a clientes que
                  buscan repuestos con proveedores confiables que ofrecen una
                  amplia variedad de estos.
                </p>
                <p>
                  Nuestro objetivo es facilitar el proceso de encontrar y
                  adquirir los repuestos que necesitas para tu vehículo.
                </p>
              </div>
              <section className="sm:space-x-2 flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto">
                <ToEnter />
              </section>
            </div>
          </section>
          <div className="flex flex-col justify-center items-center py-9 select-none">
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

          <div className="relative w-full overflow-hidden select-none mt-4">
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
          <div
            id="usageSteps"
            className="bg-gradient-to-r bg-zinc-700 flex justify-center p-12 flex-col items-center space-y-5"
          >
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
          <div className="flex flex-col md:flex-row justify-center p-10 gap-8 items-center bg-white">
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
