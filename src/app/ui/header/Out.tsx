"use client";

import Link from "next/link";
import Image from "next/image";

export function HeaderOut() {
  return (
    <div className="h-full">
      <header className=" bg-white p-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo-images/logo-center-header.png"
            alt="Busca Repuestos"
            width={500}
            height={500}
          />
          <img
            src="/logo-images/logo-start-header.png"
            alt="Busca Repuestos"
            width={63}
            height={40}
            className="sm:hidden"
          ></img>
        </Link>
      </header>
    </div>
  );
}