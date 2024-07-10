"use client";

import { Filter } from "../filters/Filter";
import { useAppContext } from "@/context";
import { TfiClose } from "react-icons/tfi";

export function NavBarFilter({carBrands}) {
  const { filter, viewFilter } = useAppContext();

  return (
    filter && (
      <div className="z-20 fixed top-0 w-auto left-0 h-screen bg-white shadow-2xl peer-focus:left-0 ease-out delay-150 duration-200 sm:hidden">
        <section className="flex justify-end p-2 -mb-4">
          <div
            onClick={viewFilter}
            className="p-2 flex justify-end cursor-pointer hover:bg-slate-200 rounded-full"
          >
            <TfiClose className="text-black text-xl" />
          </div>
        </section>
        <nav role="navigation" className="p-6 w-64">
          <section>
            <Filter
              className="flex flex-row items-center text-black"
              carBrands={carBrands}
            />
          </section>
        </nav>
      </div>
    )
  );
}
