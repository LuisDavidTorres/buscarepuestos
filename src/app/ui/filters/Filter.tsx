"use client";

import { GiToggles } from "react-icons/gi";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import dataCity from "@/app/data/dataCity";
import dataRubric from "@/app/data/dataRubric";
import { setCookie } from "cookies-next";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { usePathname } from "next/navigation";

function limpiarFiltros() {
  setCookie("selectedCars", []);
  setCookie("selectedCity", []);
  setCookie("selectedRubric", "");
}

export function Filter({ className, carBrands }: { className: string, carBrands: any[]}) {
  limpiarFiltros();
  
  const animatedComponents = makeAnimated();
  const patch = usePathname();

  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<number[]>([]);
  const [selectedRubric, setSelectedRubric] = useState("");


  carBrands = carBrands.map((carBrand) => {
    if (patch === "/home") {
      return {
        value: carBrand.car.idCardBrand,
        label: carBrand.car.nameCarBrand,
      };
    }else if (patch === "/home/mis-cotizaciones") {
      return {
        value: carBrand.idCardBrand,
        label: carBrand.nameCarBrand,
      };
    }
  });

  const { viewFilter } = useAppContext();

  const router = useRouter();

  function applyFilters() {
    setCookie("selectedCars", selectedCars);
    setCookie("selectedCity", selectedCity);
    setCookie("selectedRubric", selectedRubric);
    
    router.refresh();
  }

  function applyCloseFilters() {
    applyFilters();
    viewFilter();
  }

  return (
    <div>
      <section className={className}>
        <GiToggles id="buttonFilter"></GiToggles>
        <p className="mx-2 font-bold">Filtros</p>
      </section>
      <div className="mt-4 dark:text-black">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[]}
          isMulti
          options={carBrands}
          placeholder="Por Marca"
          onChange={(e) =>
            setSelectedCars(e.map((e) => (e as { value: number }).value))
          }
        />
        <Select
          className="mt-10"
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[]}
          isMulti
          options={dataCity}
          placeholder="Por Región"
          onChange={(e) =>
            setSelectedCity(e.map((e) => (e as { value: number }).value))
          }
        />
        <Select
          className="mt-10"
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[]}
          options={dataRubric}
          placeholder="Por Tipo"
          onChange={(e) => setSelectedRubric((e as { value: string }).value)}
        />
      </div>
      <section className="mt-10">
        <button
          onClick={applyFilters}
          className="bg-custom-green hover:bg-green-600 p-2 rounded-md text-white hidden sm:block w-full"
        >
          Aplicar
        </button>
        <button
          onClick={applyCloseFilters}
          className="bg-custom-green hover:bg-green-600 p-2 rounded-md text-white sm:hidden"
        >
          Aplicar
        </button>
      </section>
    </div>
  );
}
