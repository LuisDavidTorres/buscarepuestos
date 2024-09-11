"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuIndex } from "../Dropdown/Menu-index";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function HeaderOut() {
  const pathname = usePathname();
  const router = useRouter();
  const { toogleModal } = useAppContext();
  const { data: session, status } = useSession();

  const redirectTo = () => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      toogleModal();
    }
  };

  return (
    <div className="h-full sticky top-0 z-10">
      <header className="bg-white p-2">
        <div className="w-full flex justify-between xl:justify-start gap-x-6 items-center">
          <Link href="/">
            <Image
              src="/logo-images/logo-center-header.png"
              alt="Busca Repuestos"
              width={260}
              height={56}
              className="hidden sm:block"
              quality={100}
            />
            <Image
              src="/logo-images/logo-start-header.png"
              alt="Busca Repuestos"
              width={63}
              height={63}
              className="sm:hidden"
              quality={100}
            />
          </Link>
          {pathname === "/" && (
            <nav className="hidden xl:flex gap-x-4 items-center dark:text-black text-black font-semibold justify-between w-9/12">
              <ul className="flex gap-x-4 text-sm">
                <li className="hover:text-slate-600">
                  <a href="#usageSteps">Funcionamiento</a>
                </li>
                <li className="hover:text-slate-600">
                  <a href="#frequentQuestions">Preguntas Frecuentes</a>
                </li>
              </ul>
              {/*<button
              onClick={redirectTo}
              aria-label="login"
              name="login"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-custom-green group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative p-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {status === "authenticated" ? (
                  <p>Ir a mi cuenta</p>
                ) : (
                  <p>Ingreso Distribuidor</p>
                )}
              </span>
            </button>*/}
            </nav>
          )}

          <MenuIndex />
        </div>
        <div className="px-3 -mt-3">
          <span className="bg-gray-400 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
            Beta
          </span>
        </div>
      </header>
    </div>
  );
}
