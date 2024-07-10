"use client";

import Link from "next/link";
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

  return (
    <>
      <Link href="/crear-cotizacion" className={themeButtonSecond}>
        CLIENTE
      </Link>

      <button type="button" className={themeButtonSecond} onClick={redirectTo}>
        DISTRIBUIDOR
      </button>
    </>
  );
}
