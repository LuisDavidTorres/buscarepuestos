"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { messagePassowdIncorrect } from "@/libs/messageAlerts";
import { FormAlert } from "../alerts/Form-alert";
import { signIn } from "next-auth/react";
import { useAppContext } from "@/context";
import { ChangeEmailSuccess } from "@/libs/messageModal";
import { LoadButton } from "../buttons/Load-button";

export function ChangeEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorPassword, setErrorPassword] = useState(false);
  const { toggleModalGeneral, setMessageModalGeneral } = useAppContext();
  const [buttonLoading, setButtonLoading] = useState(false);

  const router = useRouter();

  const cancelShangeEmail = () => {
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
          newEmail: data.newEmail,
        }),
      });

      if ((await response).status === 400) {
        setErrorPassword(true);
      }
      if ((await response).status === 200) {
        const signInResponse = await signIn("credentials", {
          email: data.newEmail,
          password: data.password,
          redirect: false,
        });

        toggleModalGeneral();
        setMessageModalGeneral(ChangeEmailSuccess);
      }
      if ((await response).status === 409) {
        alert(
          "Este correo ya esta registrado, por favor intente con otro correo"
        );
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
              <p>Nuevo correo</p>
              <input
                className="border-2 p-1 rounded-md w-72"
                type="email"
                placeholder="Nuevo correo"
                {...register("newEmail", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Correo no valido",
                  },
                })}
              />
            </div>
            <div className="h-2">
              {errors.newEmail && (
                <span className="text-red-500 text-sm">
                  {errors.newEmail.message?.toString()}
                </span>
              )}
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
            onClick={cancelShangeEmail}
            className="bg-custom-gray hover:bg-gray-400 text-white rounded-md p-2 w-32"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
