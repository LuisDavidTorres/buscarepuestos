"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

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
      {alertSuccess ? (
        <div
          className="p-4 mb-4 text-sm w-full text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">
            Su contraseña ha sido actualizada exitosamente. Ahora puede iniciar
            sesión nuevamente.
          </span>
          <section>
            <Link href={"/"} className="underline">Ir a página principal</Link>
          </section>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <p className="mb-10">Ingresa tu nueva contraseña</p>
          <input
            className="border-2 p-1 rounded-md w-full"
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
            className="border-2 p-1 rounded-md w-full mt-8"
            type="password"
            placeholder="Reingrese nueva contraseña"
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
          <div className="mt-8 flex justify-end">
            <button className="bg-custom-green hover:bg-green-600 text-white rounded-md p-2 w-48 mt-6">
              Cambiar contraseña
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
