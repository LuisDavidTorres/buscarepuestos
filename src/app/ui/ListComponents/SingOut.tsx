"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export function LinkSingOut() {
  const handleCloseSession = () => {
    signOut();
  };

  return (
    <>
      <li className="list-none">
        <Link href={"/"} onClick={handleCloseSession} className="text-black">
          Cerrar sesión
        </Link>
      </li>
    </>
  );
}
