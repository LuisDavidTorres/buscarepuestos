"use client";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function ToEnter() {
  const { ModalLoginOpen, toogleModal, themeButtonSecond } = useAppContext();
  const { data: session, status } = useSession();

  const router = useRouter();

  const redirectTo = () => {
    if (status === "authenticated") {
      router.push("/home")
    }else{
      toogleModal()
    }
  };

  const redirecToCreateQuotation = () =>{
    router.push("/crear-cotizacion")
  }

  return (
    <>
      <button className={themeButtonSecond} onClick={redirecToCreateQuotation} aria-label="Cliente" name="Cliente">
        CLIENTE
      </button>

      <button className={themeButtonSecond} onClick={redirectTo} aria-label="Distribuidor" name="Distribuidor">
        DISTRIBUIDOR
      </button>
    </>
  );
}
