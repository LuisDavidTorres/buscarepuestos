"use client";

import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function ReturnRouter() {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.back();
      }}
      className="flex flex-row items-center mb-2 sm:mb-4 space-x-2 py-9 w-10/12 mx-auto hover:underline hover:cursor-pointer"
    >
      <FaArrowLeft />
      <p>Volver a la página anterior</p>
    </div>
  );
}
