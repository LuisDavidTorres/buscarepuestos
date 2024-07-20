"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import dataAreaCode from "@/app/data/dataAreaCode";
import { LoadButton } from "../buttons/Load-button";
import { useRouter } from "next/navigation";
import { messagePassowdIncorrect } from "@/libs/messageAlerts";
import { FormAlert } from "../alerts/Form-alert";
import { useState } from "react";

interface FormValues {
  newPhoneNumber: string;
  countryCode: string;
  password: string;
}

export function ChangePhoneNumber() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const [errorPassword, setErrorPassword] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  const cancelChangeNumber = () => {
    router.push("/cuenta/actualizar-datos");
  };

  const validatePhoneNumber = (
    newPhoneNumber: string,
    countryCode: CountryCode
  ) => {
    try {
      const phoneNumber = parsePhoneNumberFromString(
        newPhoneNumber,
        countryCode
      );
      return phoneNumber ? phoneNumber.isValid() : false;
    } catch (error) {
      console.error("Error al validar el número de teléfono:", error);
      return false;
    }
  };

  const countryCode = watch("countryCode", "+56"); 

  const onSubmit = handleSubmit(async (data) => {
    setButtonLoading(true);
    try {
      const response = fetch("/api/company", {
        method: "PATCH",
        next: {revalidate: 0},
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          newPhoneNumber: data.countryCode + data.newPhoneNumber,
        }),
      });

      if ((await response).status === 400) {
        setErrorPassword(true);
      }
      if ((await response).status === 200) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/cuenta");
      }
    } catch (error) {
      alert(error);
    }
    setButtonLoading(false);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-4 w-72">
          {errorPassword && (
            <FormAlert
              title={messagePassowdIncorrect.title}
              message={messagePassowdIncorrect.message}
            />
          )}
        </div>

        <div className="flex flex-col">
          <p className="mb-4">Nuevo Número</p>
          <div className="mb-10 flex flex-row">
            <div>
              <select
                {...register("countryCode")}
                className="border-2 h-9 rounded-md w-32"
              >
                {dataAreaCode.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Número de teléfono"
                className="h-9 w-40 rounded-md border-2 px-2 [&::-webkit-inner-spin-button]:appearance-none"
                {...register("newPhoneNumber", {
                  required: "Este campo es requerido",
                  validate: (value) =>
                    validatePhoneNumber(watch("countryCode")+value, countryCode as CountryCode),
                })}
              />
              {errors.newPhoneNumber && <p className="text-red-500 text-sm">El número no es válido</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-10 flex flex-col">
            <div className="space-y-4">
              <p>Contraseña actual</p>
              <input
                className="border-2 p-1 rounded-md w-72"
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
            </div>
            <div className="h-2">
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 space-x-8 flex justify-center">
          {buttonLoading ? (
            <LoadButton text="Guardando" />
          ) : (
            <button className="bg-custom-green hover:bg-green-500 text-white rounded-md p-2 w-32">
              Guardar
            </button>
          )}

          <button
            type="button"
            onClick={cancelChangeNumber}
            className="bg-custom-gray hover:bg-gray-400 text-white rounded-md p-2 w-32"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
