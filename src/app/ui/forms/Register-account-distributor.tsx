"use client";

import React from "react";
import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import makeAnimated from "react-select/animated";
import dataCars from "@/app/data/dataCars";
import SelecTelArea from "./Selet-tel-area";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadButton } from "../buttons/Load-button";
import toast, { Toaster } from "react-hot-toast";
import { RxEyeClosed } from "react-icons/rx";
import { FaRegEye } from "react-icons/fa";
import { PasswordValidator } from "./Password-validator";

export function Register_account_distribuitor() {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const animatedComponents = makeAnimated();

  const [areaCode, setAreaCode] = useState("+56");
  const [rubric, setRubric] = useState("original");
  const [carBrands, setCarBrands] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: CountryCode
  ) => {
    try {
      const phoneNum = parsePhoneNumberFromString(phoneNumber, countryCode);
      //return phoneNum ? phoneNum.isValid() : false;

      let numberWithout9 = phoneNumber.substring(4);
      let numerWithAreaCode = phoneNumber.substring(3);
      console.log(numberWithout9);
      console.log(numerWithAreaCode);
      const validateChilePhone =
        (areaCode === "+56" && !numerWithAreaCode.startsWith("9")) ||
        numberWithout9.startsWith("0") ||
        numerWithAreaCode.length < 7 ||
        (numerWithAreaCode.length > 7 && /0000/.test(numberWithout9));

      if (
        phoneNum?.isValid() === false ||
        phoneNumber === undefined ||
        validateChilePhone
      ) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error("Error al validar el número de teléfono:", error);
      return false;
    }
  };

  const countryCode = areaCode;

  const formatRut = (rut: string) => {
    rut = rut.replace(/[^0-9kK]/g, "");

    if (rut.length > 1) {
      const parts = rut.match(/(\d{1,2})(\d{0,3})(\d{0,3})([0-9Kk]?)/);
      if (parts) {
        rut = parts[1];
        if (parts[2]) rut += "." + parts[2];
        if (parts[3]) rut += "." + parts[3];
        if (parts[4]) rut += "-" + parts[4];
      }
    }

    return rut;
  };

  const selectAllCarBrands = () => {
    if (selectAll) {
      setCarBrands([]);
    } else {
      setCarBrands(dataCars.map((option) => option.value));
    }
    setSelectAll(!selectAll);
  };
  const handleRutChange = (e: any) => {
    const formattedRut = formatRut(e.target.value);
    setValue("rutCompany", formattedRut);
  };

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const res = {
        companyName: data.companyName,
        rutCompany: data.rutCompany,
        businessLine: data.businessLine,
        contactName: data.contactName,
        email: data.email,
        password: data.password,
        phoneNumber: areaCode + data.phoneNumber,
        rubric,
        carBrands,
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });

      const errorData = await response.json();

      if (response.status === 400) {
        if (errorData.errors) {
          setLoading(false);
          errorData.errors.forEach((error: any) => {
            setError(error.field, {
              type: "manual",
              message: error.message,
            });
          });
        }
      }

      if (response.ok) {
        const tokenEmailResponse = await fetch("/api/tokenEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        });

        if (!tokenEmailResponse.ok) {
          toast.error("Error al enviar código de verificación");
        }

        const signInResponse = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (signInResponse) {
          if (signInResponse.error) {
            const errorMessage = await signInResponse.error;
            setLoading(false);
          } else {
            router.push("/crear-cuenta-distribuidor/verificar-email");
          }
        }
      }
    } catch (error) {
      toast.error("Ocurrió un error durante el registro");
      setLoading(false);
    }
  });

  return (
    <div className="h-auto w-auto 2xl:max-w-screen-2xl border-2 bg-white p-5 shadow-md rounded-md">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col 2xl:flex-row 2xl:justify-around">
          <div className="flex flex-col space-y-3">
            <h1 className="font-bold text-base text-gray-600">DATOS EMPRESA</h1>
            <div>
              <h1 className="text-red-600 text-xs mb-5">
                Campos obligatorios (*)
              </h1>
            </div>

            <label
              id="label-company-name"
              htmlFor="companyName"
              className="flex flex-row space-x-1"
            >
              <p>Nombre de Empresa</p>
              <p className="text-red-600 ">*</p>
            </label>

            <input
              id="companyName"
              className="border-2 rounded-md px-2 w-full 2xl:w-full h-9"
              type="text"
              placeholder="Nombre"
              {...register("companyName", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            ></input>
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                {errors.companyName.message?.toString()}
              </span>
            )}

            <label
              id="label-rut-company"
              htmlFor="rutCompany"
              className="flex flex-row space-x-1"
            >
              {" "}
              <p>Rut</p>
              <p className="text-red-600 ">*</p>
            </label>
            <input
              id="rutCompany"
              className="border-2 rounded-md px-2 w-full 2xl:w-full h-9"
              type="text"
              placeholder="Rut"
              {...register("rutCompany", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                maxLength: {
                  value: 12,
                  message: "Formato RUT Empresa No Valido",
                },
                pattern: {
                  value: /^[5-9][0-9]\.\d{3}\.\d{3}-[0-9Kk]$/,
                  message: "Formato RUT Empresa No Valido",
                },
                onChange: (e) => {
                  {
                    handleRutChange(e);
                  }
                },
              })}
            ></input>
            {errors.rutCompany && (
              <span className="text-red-500 text-sm">
                {errors.rutCompany.message?.toString()}
              </span>
            )}

            <label
              id="label-businessLine"
              htmlFor="businessLine"
              className="flex flex-row space-x-1"
            >
              <p>Giro</p>
              <p className="text-red-600 ">*</p>
            </label>
            <input
              id="businessLine"
              className="border-2 rounded-md px-2 w-full 2xl:w-full h-9"
              type="text"
              placeholder="Giro"
              {...register("businessLine", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            ></input>
            {errors.businessLine && (
              <span className="text-red-500 text-sm">
                {errors.businessLine.message?.toString()}
              </span>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center space-x-1">
              {" "}
              <label
                id="label-contact-name"
                htmlFor="contactName"
                className="flex flex-row space-x-1"
              >
                <p>Nombre y Apellido</p>
                <p className="text-red-600 ">*</p>
              </label>
              <p className="text-xs text-gray-500 italic ml-2">(Representante Legal o Responsable)</p>
            </div>

            <input
              id="contactName"
              className="border-2 rounded-md px-2 w-full 2xl:w-full h-9"
              type="text"
              placeholder="Nombre"
              {...register("contactName", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            ></input>
            {errors.contactName && (
              <span className="text-red-500 text-sm">
                {errors.contactName.message?.toString()}
              </span>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center space-x-1">
              {" "}
              <label
                id="label-contact-phone"
                htmlFor="contacPhone"
                className="flex flex-row space-x-1"
              >
                <p>Teléfono</p>
                <p className="text-red-600 ">*</p>
              </label>
              <p  className="text-xs text-gray-500 italic ml-2">(Representante Legal o Responsable)</p>
            </div>

            <div className="flex flex-row">
              <SelecTelArea
                setCode={setAreaCode}
                clases="w-36 2xl:w-33 h-7 border-2 rounded-md h-9"
              />
              <input
                id="contacPhone"
                className="w-3/5 2xl:w-8/12 border-2 rounded-md px-2 h-9 [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                placeholder="Número"
                {...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  validate: (value) =>
                    validatePhoneNumber(
                      areaCode + value,
                      countryCode as CountryCode
                    ),
                })}
              ></input>
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">El número no es válido</p>
            )}

            <label
              id="label-rubric"
              htmlFor="rubric"
              className="flex flex-row space-x-1"
            >
              {" "}
              <p>Tipo de Repuestos</p>
              <p className="text-red-600 ">*</p>
            </label>
            <select
              id="rubric"
              className="border-2 rounded-md w-full 2xl:w-full h-9"
              onChange={(e) => setRubric(e.target.value)}
              required
            >
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

            <label
              id="label-carbrands"
              htmlFor="carBrands2"
              className="flex flex-row space-x-1"
            >
              {" "}
              <p>Marcas que Comercializa</p>
              <p className="text-red-600 ">*</p>
            </label>
            <div>
              <Select
                id="carBrands2"
                className="w-full 2xl:w-96"
                instanceId={"carBrands2"}
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={dataCars.filter((option) =>
                  carBrands.includes(option.value)
                )}
                isMulti
                options={dataCars}
                placeholder="Buscar"
                onChange={(e) => setCarBrands(e.map((e) => e.value))}
                required
              />
            </div>
            <label className="inline-flex items-center cursor-pointer">
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
          </div>
          <div className="flex flex-col space-y-3 2xl:w-4/12 mt-10 2xl:mt-0">
            <h1 className="font-bold text-base text-gray-600">
              DATOS DE AUTENTICACIÓN
            </h1>
            <p className="text-xs text-gray-500">(Crea tu Cuenta BR)</p>
            <div className="flex items-center space-x-1">
              <label
                id="label-email"
                htmlFor="email"
                className="flex flex-row space-x-1"
              >
                <p className="text-red-600 ">*</p>
                <p>Email</p>
              </label>
              <p className="text-xs text-gray-500 italic ml-2">(Empresa)</p>
            </div>
            <input
              id="email"
              className="border-2 rounded-md px-2 w-full 2xl:w-full h-9"
              type="email"
              placeholder="Email"
              autoComplete="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Email no valido",
                },
              })}
            ></input>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message?.toString()}
              </span>
            )}
            <label
              id="label-password"
              htmlFor="password"
              className="flex flex-row space-x-1"
            >
              <p className="text-red-600 ">*</p>
              <p>Contraseña</p>
            </label>
            <div className="relative w-full">
              {" "}
              <input
                id="password"
                className="border-2 rounded-md px-2 w-full 2xl:w-full h-9"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                autoComplete="current-password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial",
                  },
                })}
              ></input>
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaRegEye /> : <RxEyeClosed />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message?.toString()}
              </span>
            )}
            <PasswordValidator password={watch("password")} />
          </div>
        </div>

        <section className="mt-10 2xl:mx-14 flex flex-col md:flex-row md:justify-end space-x-5 items-center">
          <div className="flex space-x-2 items-start">
            <input
              name="terminos"
              className="mt-1"
              id="terminos"
              type="checkbox"
              required
            ></input>
            <label
              id="label-terminos"
              htmlFor="terminos"
              className="flex flex-col space-y-1 sm:flex-row sm:space-x-1 sm:space-y-0"
            >
              <p className="inline text-sm">Estoy de acuerdo con los</p>
              <a
                href="/terminos"
                target="_blank"
                className="no-underline hover:underline text-blue-700 inline text-sm "
              >
                Términos y Condiciones
              </a>
            </label>
          </div>

          <div className="mt-10 md:mt-0">
            {loading ? (
              <LoadButton text="Cargando" />
            ) : (
              <button
                type="submit"
                className="bg-custom-green hover:bg-green-400 w-20 p-2 rounded-md text-white"
              >
                Enviar
              </button>
            )}
          </div>
        </section>
      </form>
    </div>
  );
}
