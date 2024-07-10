"use client";

import { FaShareFromSquare } from "react-icons/fa6";
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
      <button onClick={handleShareClick}>
        <FaShareFromSquare className="text-lg" />
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
