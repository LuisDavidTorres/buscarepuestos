"use client";

import { FaShare } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function ButtonShare() {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText("www.buscarepuestos.cl").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copiado al portapapeles");
    });
  };

  return (
    <>
      <button aria-label="sharePage" onClick={handleShareClick}>
        <FaShare className="text-lg" />
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
