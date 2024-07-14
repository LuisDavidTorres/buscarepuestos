import { ModalLoginSupplier } from "./ui/home/ModalLoginSupplier";
import { HeaderOut } from "./ui/header/Out";
import { ToEnter } from "./ui/buttons/To-enter";
import { UsageSteps } from "./ui/cards/Usage-steps";
import { IoIosLock } from "react-icons/io";

async function Home() {
  return (
    <>
      <main className="min-h-screen bg-custom-green">
        <HeaderOut />
        <p>HOLA</p>
        <div className="flex flex-col md:justify-center">
          <div className="bg-gradient-to-r bg-zinc-700 w-full flex flex-col items-center h-60" style={{ boxShadow: '10px 15px 10px rgba(0, 0, 0, 0.5)' }}>
          <div className="mt-4">
              <span className="bg-clip-text text-slate-100 text-xs sm:text-base">
                MESÓN DIGITAL DE REPUESTOS AUTOMOTRICES
              </span>
            </div>
            <div className="bg-gradient-to-r from-white to-gray-200 w-3/4 md:w-2/6 lg:w-1/4 h-36 border-l-neutral-500/800 rounded-md p-4 my-6 shadow-2xl">
              <p className="flex justify-center text-xl">Ingreso</p>
              <div className="space-x-5 flex justify-items-center justify-center my-8">
                <ToEnter />
              </div>
            </div>
          </div>
          <div className="flex justify-center py-20">
            <img
              className="drop-shadow-[7px_10px_5px_rgba(0,0,0,0.5)]"
              alt="br-logo"
              width={60}
              height={60}
              src={"/logo-images/br-logo.png"}
            ></img>
          </div>

          <div>
            <img src={"/images/backgrounds/Fondo_BR_home_index.png"}></img>
          </div>
          <div className="bg-gradient-to-r bg-zinc-700 flex justify-center p-12 flex-col items-center space-y-5">
            <h1 className="text-gray-400">PLATAFORMA PROTEGIDA Y SEGURA.</h1>
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

            <p className="text-gray-400 text text-xs">INFRAESTRUCTURA AWS.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center p-10 gap-10 items-center bg-white">
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
