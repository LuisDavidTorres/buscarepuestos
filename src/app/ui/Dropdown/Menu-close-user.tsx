"use client";

import { useRef, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function MenuCloseUser() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const Menu = ["Mi Cuenta", "Mesón Digital" ,"Mis Cotizaciones", "Bolsas Virtuales" , "Cerrar Sesión"];

  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleCloseSession = () => {
    signOut(); 
  };

  return (
    <div>
      <div
        className="relative cursor-pointer hover:bg-neutral-300 rounded-md p-2"
        onClick={() => setOpen(!open)}
        ref={iconRef}
      >
        <GiHamburgerMenu className="text-black size-5 sm:size-7" />
      </div>
      {open && <Updown />}
    </div>
  );

  function Updown() {
    return (
      <div
        className="bg-zinc-50 dark:text-black p-2 shadow-lg absolute z-10 right-4 rounded-md mt-5"
        ref={menuRef}
      >
        <ul>
          {Menu.map((menu) => (
            <li
              key={menu}
              className={`p-2 text-base cursor-pointer rounded hover:bg-zinc-300 select-none ${menu === "Cerrar Sesión" ? 'text-red-600 dark:text-red-600' : ''}`}
              onClick={() => {
                if (menu === "Cerrar Sesión") {
                  handleCloseSession();
                }
                if (menu === "Mis Cotizaciones") {
                  router.push("/home/mis-cotizaciones");
                }
                if (menu === "Mi Cuenta") {
                  router.push("/cuenta");
                }
                if (menu === "Mesón Digital") {
                  router.push("/home");
                }
                if (menu === "Bolsas Virtuales") {
                  router.push("/cambiar-plan");
                }

                setOpen(false);

              }}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

