"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export function ResetPasswordTokenForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [alertSuccess, setAlertSuccess] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/token/" + token, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: data.newPassword,
        }),
      });

      if (response.ok) {
        setAlertSuccess(true);
      } else {
        alert("Error al cambiar la contraseña");
      }
    } catch (error) {
      alert("Ha ocurrido un error al intentar cambiar la contraseña");
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        {alertSuccess && (
          <div
            className="p-4 mb-4 text-sm w-9/12 sm:w-7/12 md:w-9/12 lg:w-5/12 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">
              Su contraseña ha sido actualizada exitosamente. Ahora puede
              iniciar sesión.
            </span>
          </div>
        )}
        <input
          className="border-2 p-1 rounded-md w-72"
          type="password"
          placeholder="Nueva contraseña"
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
        <div className="h-2">
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message?.toString()}
            </span>
          )}
        </div>
        <input
          className="border-2 p-1 rounded-md w-72 mt-8"
          type="password"
          placeholder="Reingrese Nueva contraseña"
          {...register("newPasswordConfirm", {
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
        <div className="h-2">
          {errors.newPasswordConfirm && (
            <span className="text-red-500 text-sm">
              {errors.newPasswordConfirm.message?.toString()}
            </span>
          )}
        </div>
        <div className="mt-8">
          <button className="bg-custom-green hover:bg-green-500 text-white rounded-md p-2 w-48 mt-6">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
