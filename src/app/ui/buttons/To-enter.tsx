"use client";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function ToEnter() {
  const { ModalLoginOpen, toogleModal, themeButtonSecond } = useAppContext();
  const { data: session, status } = useSession();

  const router = useRouter();

  const redirectTo = () => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      toogleModal();
    }
  };

  const redirecToCreateQuotation = () => {
    router.push("/crear-cotizacion");
  };

  return (
    <>
      <button
        onClick={redirecToCreateQuotation}
        aria-label="Cliente"
        name="Cliente"
        className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-500 to-green-600 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-3 focus:outline-none focus:ring-green-400 dark:ring-green-400"
      >
        <span className="w-full sm:w-52 relative px-5 py-2.5 transition-all ease-in duration-75 bg-custom-green dark:bg-custom-green rounded-md group-hover:bg-opacity-0">
          Buscar Repuestos
        </span>
      </button>

      <button
        onClick={redirectTo}
        aria-label="Cliente"
        name="Cliente"
        className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-gray-400 to-custom-gray group-hover:from-lime-300 group-hover:to-blue-500 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-gray-500 dark:ring-gray-500"
      >
        <span className="w-full sm:w-52 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
          {status === "authenticated" ? (
            <p>Ir a mi cuenta</p>
          ) : (
            <p>Únete como Proveedor</p>
          )}
        </span>
      </button>
    </>
  );
}
