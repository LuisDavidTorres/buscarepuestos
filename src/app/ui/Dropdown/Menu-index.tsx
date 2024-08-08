"use client";

import { useRef, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export function MenuIndex() {
  const [open, setOpen] = useState(false);

  const Menu = [
    { item: "Funcionamiento", id: "#usageSteps" },
    { item: "Preguntas Frecuentes", id: "#frequentQuestions" },
  ];

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

  return (
    <div className="xl:hidden">
      <div
        className="relative cursor-pointer hover:bg-neutral-300 rounded-md p-2"
        onClick={() => setOpen(!open)}
        ref={iconRef}
      >
        <GiHamburgerMenu className="text-black size-7" />
      </div>
      <div
        className={`${
          open ? "opacity-100" : "opacity-0"
        } transition-all duration-300 ease-out`}
      >
        {open && <Updown />}
      </div>
    </div>
  );

  function Updown() {
    return (
      <div
        className="bg-zinc-50 dark:text-black p-2 shadow-lg absolute z-10 right-2 rounded-md mt-5"
        ref={menuRef}
      >
        <ul>
          {Menu.map((menu) => (
            <li
              key={menu.id}
              className="p-2 text-base cursor-pointer rounded hover:bg-zinc-300 select-none"
              onClick={() => {
                setOpen(false);
              }}
            >
              <a href={menu.id}>{menu.item}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
