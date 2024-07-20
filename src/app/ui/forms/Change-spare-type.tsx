"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { messagePassowdIncorrect } from "@/libs/messageAlerts";
import { FormAlert } from "../alerts/Form-alert";
import { LoadButton } from "../buttons/Load-button";

export function ChangeSpareTypeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorPassword, setErrorPassword] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  const cancelChangeSpareType = () => {
    router.push("/cuenta/actualizar-datos");
  };

  const onSubmit = handleSubmit(async (data) => {
    setButtonLoading(true);
    try {
      const response = fetch("/api/company", {
        method: "PATCH",
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          newSpareType: data.newSpareType,
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
          <div className="mb-10 flex flex-col">
            <div className="space-y-4">
              <p>Tipo de Repuesto a Comercializar</p>
              <select
                className="border-2 p-1 rounded-md w-72"
                defaultValue={"original"}
                {...register("newSpareType", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
              >
                {" "}
                <option className="text-sm md:text-base" value="original">
                  Originales
                </option>
                <option className="text-sm md:text-base" value="alternative">
                  Alternativos
                </option>
                <option
                  className="text-sm md:text-base"
                  value="originalandalternative"
                >
                  Ambos
                </option>
              </select>
            </div>
            <div className="h-2">
              {errors.newSpareType && (
                <span className="text-red-500 text-sm">
                  {errors.newSpareType.message?.toString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-10 flex flex-col">
            <div className="space-y-4">
              <p>Contraseña Actual</p>
              <input
                className="border-2 p-1 rounded-md w-72"
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
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
            onClick={cancelChangeSpareType}
            className="bg-custom-gray hover:bg-gray-400 text-white rounded-md p-2 w-32"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
