"use client"

import { GiToggles } from "react-icons/gi";
import { useAppContext } from "@/context";

export function ButtonFilter() {
  const { viewFilter } = useAppContext();

  return (
    <div>
      <button onClick={viewFilter} className="h-14 w-32 space-x-2 flex flex-row-reverse items-center justify-center border-2 bg-white hover:text-gray-600 hover:bg-slate-100 rounded-md">
        <p className="mx-2 dark:text-black">Filtrar</p>
        <GiToggles id="buttonFilter"></GiToggles>
      </button>
    </div>
  );
}
