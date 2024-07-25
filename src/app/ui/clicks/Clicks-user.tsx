"use client";

import { useState, useEffect } from "react";
import { PlanRedirect } from "../buttons/Plans-redirect";
import { usePathname } from "next/navigation";

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
        ) : totalClicks === 0 ? (
          <PlanRedirect />
        ) : (
          <div>
            <label className="flex space-x-2 max-[347px]:space-x-1 max-[347px]:text-sm">
              <p>Clicks disponibles:</p>
              <p>{totalClicks}</p>
            </label>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}

