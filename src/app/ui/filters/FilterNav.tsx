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

export function FilterNav({ className, carBrands }: { className: string, carBrands: any[]}) {
  limpiarFiltros();
  
  const animatedComponents = makeAnimated();
  const patch = usePathname();
  const router = useRouter();

  const { viewFilter, filterRubric, setFilterRubric, filterCars, setFilterCars, filterCity, setFilterCity} = useAppContext();

  const [selectedCars, setSelectedCars] = useState<number[]>([...filterCars]);
  const [selectedCity, setSelectedCity] = useState<number[]>([...filterCity]);
  const [selectedRubric, setSelectedRubric] = useState(filterRubric);


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

  const cars = carBrands.filter((element) => filterCars.includes(element.value));
  const cities = dataCity.filter((element) => filterCity.includes(element.value));
  const rubric = dataRubric.find((element) => element.value === filterRubric);

  function applyFilters() {
    setCookie("selectedCars", selectedCars);
    setCookie("selectedCity", selectedCity);
    setCookie("selectedRubric", selectedRubric);
    setFilterCars(selectedCars)
    setFilterCity(selectedCity)
    setFilterRubric(selectedRubric)
    
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
          instanceId={"select-marca"}
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={cars}
          isMulti
          options={carBrands}
          noOptionsMessage={() => "Marca no encontrada"}
          placeholder="Por Marca"
          onChange={(e) =>
            setSelectedCars(e.map((e) => (e as { value: number }).value))
          }
        />
        <Select
          instanceId={"select-region"}
          className="mt-10"
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={cities}
          isMulti
          options={dataCity}
          noOptionsMessage={() => "Región no encontrada"}
          placeholder="Por Región"
          onChange={(e) =>
            setSelectedCity(e.map((e) => (e as { value: number }).value))
          }
        />
        <Select
          instanceId={"select-tipo"}
          className="mt-10"
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={[rubric]}
          options={dataRubric}
          noOptionsMessage={() => "Tipo no encontrado"}
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
          className="bg-custom-green hover:bg-green-600 p-2 rounded-md text-white sm:hidden w-full"
        >
          Aplicar
        </button>
      </section>
    </div>
  );
}