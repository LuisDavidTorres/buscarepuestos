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

  carBrands = carBrands.map((carBrand) => {
    return {
      value: carBrand.car.idCardBrand,
      label: carBrand.car.nameCarBrand,
    };
  });

  const carBrandValues = carBrands.map((carBrand) => carBrand.value);

  const [carBrand, setCarBrand] = useState(carBrandValues);
  const [buttonLoading, setButtonLoading] = useState(false);

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
            className="w-60 sm:w-96"
            instanceId={"carBrands"}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={carBrands}
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
            onChange={(e) =>
              setCarBrand(e.map((e) => (e as { value: number }).value))
            }
          />
        </div>
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
