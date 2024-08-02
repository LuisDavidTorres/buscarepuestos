"use client";

import Link from "next/link";
import Image from "next/image";

export function HeaderOut() {
  return (
    <div className="h-full">
      <header className=" bg-white p-1 sm:p-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo-images/logo-center-header.png"
            alt="Busca Repuestos"
            width={260}
            height={500}
            className="hidden sm:block"
            quality={100} 
          />
          <Image
            src="/logo-images/logo-start-header.png"
            alt="Busca Repuestos"
            width={63}
            height={40}
            className="sm:hidden"
            quality={100} 
          />
        </Link>
      </header>
    </div>
  );
}