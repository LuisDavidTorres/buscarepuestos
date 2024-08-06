"use client";

import Link from "next/link";
import Image from "next/image";

export function HeaderOut() {
  return (
    <div className="h-full sticky top-0 z-10">
      <header className="bg-white p-2 flex justify-start gap-x-6 items-center">
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
        <nav className="hidden xl:flex gap-x-4 items-center dark:text-black text-black font-semibold">
          <ul className="flex gap-x-4 text-sm">
            <li className="hover:text-slate-600">
              <a href="#usageSteps">Funcionamiento</a>
            </li>
            <li className="hover:text-slate-600">
              <a href="#frequentQuestions">Preguntas Frecuentes </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
