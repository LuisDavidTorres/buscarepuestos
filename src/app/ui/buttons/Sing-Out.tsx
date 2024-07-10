"use client";

import { signOut } from "next-auth/react";

export function ButtonSingOut() {
  const handleCloseSession = () => {
    signOut();
  };

  return (
    <button
      onClick={() => handleCloseSession()}
      className="bg-primary-500 text-white"
    >
      Cerrar sesión
    </button>
  );
}
