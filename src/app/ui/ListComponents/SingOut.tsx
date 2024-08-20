"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LinkSingOut() {
  const handleCloseSession = () => {
    signOut();
  };

  const pathname = usePathname()

  return (
    <>
      <li className="list-none">
        <Link href={"/"} onClick={handleCloseSession} className={`${pathname === '/crear-cotizacion' || '/crear-cuenta-distribuidor/verificar-email' ? ' text-white' : 'text-black'}`}>
          Cerrar sesión
        </Link>
      </li>
    </>
  );
}
