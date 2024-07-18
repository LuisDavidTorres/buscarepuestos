"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = fetch("/api/user/" + data.email);

      const errorData = await response.then((res) => res.json());

      if ((await response).status === 404) {
        setError("email", {
          type: "manual",
          message: errorData.message,
        });
      } else if ((await response).status === 200) {
        setEmail(data.email);
        setAlertSuccess(true);

        const response = fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        });
      }
    } catch (error) {
      alert("Ha ocurrido un error al intentar recuperar la contraseña");
    }
  });

  return (
    <div>
      {alertSuccess ? (
        <div
          className="p-4 mb-4 text-sm 2xl:w-full text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">!Correo enviado!</span> Te enviamos un
          email con instrucciones para restablecer la contraseña a{" "}
          <span className="font-medium">{email}</span> Si no lo ves en tu
          bandeja de entrada, revisa la carpeta de correo no deseado.
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            className="border-2 p-1 rounded-md w-72"
            type="email"
            placeholder="Correo"
            {...register("email", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          <div className="h-2">
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </span>
            )}
          </div>
          <div className="mt-8">
            <button
              className="bg-custom-green hover:bg-green-500 text-white rounded-md p-2 w-36"
              type="submit"
            >
              Enviar un email
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
