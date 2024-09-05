"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

export function VerifyEmailAccountForm() {
  const { data: session, update } = useSession();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const UserEmail = session?.user?.email;

  async function verifyEmail() {
    await update({
      ...session,
      user: {
        ...session?.user,
        emailVerified: true,
      },
    });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = e.target.value;
    if (/^\d?$/.test(newValue)) {
      const newCode = [...code];
      newCode[index] = newValue;
      setCode(newCode);

      if (newValue && index < 6) {
        document.getElementById(`input-${index + 1}`)?.focus();
      }

      if (!newValue && index > 0) {
        document.getElementById(`input-${index - 1}`)?.focus();
      }
    }
  };

  const customToasterProps = {
    duration: 2000,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/tokenEmail", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: code.join("") }),
      });

      if (response.ok) {
        toast.success("Email verificada con éxito", customToasterProps);
        await verifyEmail();
        router.push("/crear-cuenta-distribuidor/verificar-empresa");
      }

      if (response.status === 400) {
        toast.error("Código incorrecto o expirado", customToasterProps);
      }

      if (response.status === 404) {
        toast.error("Usuario no encontrado", customToasterProps);
      }

      if (response.status === 500) {
        toast.error("Error al verificar la cuenta", customToasterProps);
      }
    } catch (error) {
      console.log("Ha ocurrido un error al verificar la cuenta");
    }
  };

  const handleSubmitToken = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const tokenEmailResponse = await fetch("/api/tokenEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: UserEmail}),
      });

      if(tokenEmailResponse.ok){
        toast.success("Email enviado nuevamente", customToasterProps);
      }else if (tokenEmailResponse.status === 429){
        toast.error("Espera 5 minutos para solicitar un nuevo código", customToasterProps);
      }else{
        toast.error("No se ha podido enviar el email de verificación", customToasterProps);
      }
    } catch {
      toast.error("No se ha podido enviar el email de verificación", customToasterProps);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-md shadow-md">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Código de Verificación</h1>
        <p className="text-[15px] text-slate-500">
          Por favor ingresa el código de verificación que te enviamos a tu Email
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              id={`input-${index}`}
              className="w-3/4 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded outline-none focus:bg-white focus:border-custom-green focus:ring-2 focus:ring-custom-green"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(e, index)}
              inputMode="numeric"
              pattern="[0-9]*"
              required
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-9">
          <button className="w-full inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 bg-custom-green hover:bg-green-500 text-white">
            Verificar Cuenta
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        ¿No recibiste el código?{" "}
        <a className="font-medium text-black hover:text-zinc-400 hover:cursor-pointer" onClick={handleSubmitToken}>
          Reenviar
        </a>
      </div>
    </div>
  );
}
