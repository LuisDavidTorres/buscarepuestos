"use client";

import { useState, useEffect } from "react";
import { PlanRedirect } from "../buttons/Plans-redirect";
import { usePathname } from "next/navigation";
import { PiCursorClickFill } from "react-icons/pi";

export function ClicksUser() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const response = await fetch("/api/userSubscription");
        if (!response.ok) {
          throw new Error("Error al leer los clicks disponibles");
        }
        const data = await response.json();
        setTotalClicks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error a leer los clicks disponibles");
        setLoading(false);
      }
    };

    fetchClicks();

    const intervalId = setInterval(fetchClicks, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (pathname !== "/cambiar-plan") {
    return (
      <div className="gap-2 text-black font-bold">
        {loading ? (
          <div className="h-6 w-44 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full animate-pulse"></div>
        ) : (
          <section className="flex items-center space-x-2 sm:space-x-5">
            <div className="flex items-center rounded-md bg-green-400 px-2 py-1.5 text-white space-x-1 sm:hidden">
              <PiCursorClickFill />
              <label className="flex max-[347px]:space-x-1 max-[347px]:text-sm">
                <p>{totalClicks}</p>
              </label>
            </div>
            <div className="hidden sm:block p-2 rounded-md bg-gray-100 shadow-sm">
              <label className="flex items-center space-x-2 max-[347px]:space-x-1 max-[347px]:text-sm">
                <PiCursorClickFill className="text-green-500" />
                <p className="text-gray-700 font-semibold">
                  Clics disponibles:
                </p>
                <p className="text-green-600 font-bold">{totalClicks}</p>
              </label>
            </div>

            <PlanRedirect />
          </section>
        )}
      </div>
    );
  } else {
    return null;
  }
}
