"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormAlert } from "../alerts/Form-alert";
import { messagePassowdIncorrect } from "@/libs/messageAlerts";
import { useAppContext } from "@/context";
import { ChangePasswordSuccess } from "@/libs/messageModal";
import { LoadButton } from "../buttons/Load-button";

export function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [errorPassword, setErrorPassword] = useState(false);
  const { toggleModalGeneral, setMessageModalGeneral } = useAppContext();
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  const cancelShangePassword = () => {
    router.push("/cuenta/actualizar-datos");
  };

  const onSubmit = handleSubmit(async (data) => {
    setButtonLoading(true);
    try {
      const response = fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          newPassword: data.newPassword,
        }),
      });

      if ((await response).status === 400) {
        setErrorPassword(true);
      }
      if ((await response).status === 200) {
        toggleModalGeneral();
        setMessageModalGeneral(ChangePasswordSuccess);
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
              <p>Contraseña actual</p>
              <input
                className="border-2 p-1 rounded-md w-72"
                type="password"
                placeholder="Contraseña actual"
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
          <div className="mb-10 flex flex-col">
            <div className="space-y-4">
              <p>Nueva contarseña</p>
              <input
                className="border-2 p-1 rounded-md w-72"
                type="password"
                placeholder="Contraseña nueva"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
            </div>
            <div className="h-2">
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {errors.newPassword.message?.toString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="space-y-4">
              <p>Reescribe la nueva contraseña</p>
              <input
                className="border-2 p-1 rounded-md w-72"
                type="password"
                placeholder="Reescribe la contraseña nueva"
                {...register("reNewPassword", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  validate: (value) => {
                    if (value === watch("newPassword")) {
                      return true;
                    } else {
                      return "Las contraseñas no coinciden";
                    }
                  },
                })}
              />
            </div>
            <div className="h-2">
              {errors.reNewPassword && (
                <span className="text-red-500 text-sm">
                  {errors.reNewPassword.message?.toString()}
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
            onClick={cancelShangePassword}
            className="bg-custom-gray hover:bg-gray-400 text-white rounded-md p-2 w-32"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
