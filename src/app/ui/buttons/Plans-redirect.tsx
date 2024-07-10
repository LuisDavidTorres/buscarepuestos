"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PlanRedirect() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push("/cambiar-plan");
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleClick}
        type="button"
        className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Cargando..." : "Explorar planes"}
      </button>
    </div>
  );
}
