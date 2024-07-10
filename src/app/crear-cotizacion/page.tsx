import Header from "../ui/header/Header";
import { Create_quotation } from "../ui/forms/Create-quotation";
import { ModalGeneral } from "../ui/modals/Modal-general";
import { DesingHeaderDown } from "../ui/header/Desing-header-down";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cotización",
};

export default function Page() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <DesingHeaderDown titulo="CREAR COTIZACIÓN" />
        <div className="p-5 sm:p-8">
          <Create_quotation />
        </div>
        <ModalGeneral />
      </div>
    </>
  );
}
