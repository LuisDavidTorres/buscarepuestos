"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import dataCars from "@/app/data/dataCars";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadButton } from "../buttons/Load-button";

export function UpdateCarBrandsForm({ carBrands }: { carBrands: any[] }) {
  const animatedComponents = makeAnimated();
  const router = useRouter();

  const cancelChangeCarBrands = () => {
    router.push("/cuenta/actualizar-datos");
  };

  const formattedCarBrands = carBrands.map((carBrand) => ({
    value: carBrand.car.idCardBrand,
    label: carBrand.car.nameCarBrand,
  }));

  const carBrandValues = formattedCarBrands.map((carBrand) => carBrand.value);

  const [carBrand, setCarBrand] = useState(carBrandValues);
  const [selectAll, setSelectAll] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const selectAllCarBrands = () => {
    if (selectAll) {
      setCarBrand([]);
    } else {
      setCarBrand(dataCars.map((option) => option.value));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setButtonLoading(true);

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carBrands: carBrand,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if ((await response).status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/cuenta");
      }
    } catch (error) {
      console.log("Ha ocurrido un error al intentar actualizar las marcas de vehiculos");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            className="w-full sm:w-96"
            instanceId={"carBrands"}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={formattedCarBrands}
            isMulti
            options={dataCars}
            placeholder="Filtrar por marca"
            required
            styles={{
              menu: (provided) => ({
                ...provided,
                maxHeight: 200,
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: 170,
                overflowY: "auto",
              }),
            }}
            value={dataCars.filter((option) =>
              carBrand.includes(option.value)
            )}
            onChange={(e) =>
              setCarBrand(e.map((e) => (e as { value: number }).value))
            }
          />
        </div>
        <label className="inline-flex items-center cursor-pointer mt-4">
          <input
            type="checkbox"
            value=""
            checked={selectAll}
            onChange={selectAllCarBrands}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-al peer-checked:bg-custom-green"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-900">
            Todas las Marcas
          </span>
        </label>
        <div className="mt-48 space-x-8 flex justify-center">
          {buttonLoading ? (
            <LoadButton text="Guardando" />
          ) : (
            <button className="bg-custom-green hover:bg-green-500 text-white rounded-md p-2 w-32">
              Guardar
            </button>
          )}

          <button
            onClick={cancelChangeCarBrands}
            type="button"
            className="bg-custom-gray hover:bg-gray-400 text-white rounded-md p-2 w-32"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
