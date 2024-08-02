"use client";

import { useState, useEffect, useRef } from "react";

export function MenuAccountDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Cuenta");
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadLabel = async () => {
      const savedLabel = localStorage.getItem("menuButtonLabel");
      if (savedLabel) {
        setButtonLabel(savedLabel);
      } else {
        setButtonLabel("Cuenta");
      }
      setIsLoading(false);
    };

    loadLabel();
  }, []);

  const handleMenuItemClick = (label: string) => {
    setButtonLabel(label);
    localStorage.setItem("menuButtonLabel", label);
    setIsOpen(false);
  };

  const menuItems = [
    { label: "Cuenta", href: "/cuenta" },
    { label: "Actualizar datos", href: "/cuenta/actualizar-datos" },
    { label: "Historial de pagos", href: "/cuenta/historial-de-pagos" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        className="text-white bg-custom-green font-semibold w-48 focus:outline-none focus:border-dashed border-2 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleMenu}
      >
        <span className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {buttonLabel}
        </span>
        <svg
          className="w-2.5 h-2.5 ml-auto"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute top-full left-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleMenuItemClick(item.label)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
