"use client";

import Link from "next/link";
import { TfiClose } from "react-icons/tfi";
import { useAppContext } from "@/context";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";

interface FormValues {
  email: string;
  password: string;
}

export function ModalLoginSupplier() {
  const { ModalLoginOpen, toogleModal } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res) {
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push("/home");
      }
    }
  });

  return (
    <>
      {ModalLoginOpen && (
        <div className="fixed top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="flex flex-col px-4 sm:px-6 py-5 lg:px-7 bg-white border-2 rounded-lg w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 md:h-4/5 2xl:max-w-max">
            <section className="flex md:justify-end justify-start">
              <div
                onClick={toogleModal}
                className="cursor-pointer p-2 hover:bg-slate-200 rounded-full"
              >
                <TfiClose className="text-black" />
              </div>
            </section>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-xl md:text-2xl font-bold leading-9 text-gray-900">
                Cuenta Distribuidor
              </h2>
            </div>

            <div className="mt-2 md:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={onSubmit}>
                {error && (
                  <p className="bg-red-500 text-md text-white p-1 rounded-md text-center mb-2">
                    {error}
                  </p>
                )}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "El correo es requerido",
                          },
                        })}
                        autoComplete="email"
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between ">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contraseña
                      </label>
                      <div className="text-sm">
                        <a
                          href="/reiniciar-contrasena"
                          className="font-semibold text-blue-600 hover:text-blue-900"
                        >
                          ¿Olvidó su contraseña?
                        </a>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="relative w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: {
                              value: true,
                              message: "La contraseña es requerida",
                            },
                          })}
                          autoComplete="current-password"
                          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-gray-500 sm:text-sm sm:leading-6"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FaRegEye /> : <RxEyeClosed />}
                        </button>
                      </div>
                      {errors.password && <p>{errors.password.message}</p>}
                    </div>
                  </div>

                  <div>
                    {loading ? (
                      <button
                        disabled
                        type="button"
                        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900 items-center"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          ></path>
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        Ingresando
                      </button>
                    ) : (
                      <button className="flex w-full justify-center rounded-md bg-custom-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-900">
                        Ingresar
                      </button>
                    )}
                  </div>
                </div>
              </form>

              <section className="flex sm:flex-row flex-col mt-10 text-sm justify-center items-center space-x-1">
                <p className="text-gray-500">
                  ¿Aún no tiene Cuenta Distribuidor?
                </p>
                <p className="mt-1 sm:mt-0">
                  <Link
                    href="/crear-cuenta-distribuidor"
                    className="font-semibold leading-6 text-blue-600 hover:text-blue-900"
                  >
                    Regristro Aquí.
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
