"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [ModalLoginOpen, setModalLogin] = useState(false);
  const [modalGeneralOpen, setModalGeneralOpen] = useState(false);
  const [modalacceptquotation, setModalAcceptQuotation] = useState(false);
  const [messageModalGeneral, setMessageModalGeneral] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterCars, setFilterCars] = useState([]);
  const [filterCity, setFilterCity] = useState([]);
  const [filterRubric, setFilterRubric] = useState("");

  const [themeButton, setThemeButton] = useState(
    "bg-custom-green p-2 rounded-md text-white w-28 hover:bg-green-700 text-center text-sm"
  );

  const [themeButtonSecond, setThemeButtonSecond] = useState(
    "bg-custom-green p-2 relative rounded-md text-white w-48 hover:bg-green-700 text-center"
  );

  const [planSelected, setSelectedPlan] = useState({
    name: null,
    price: null,
  });

  useEffect(() => {
    setFilterRubric("");
    setFilterCars([]);
    setFilterCity([]);
  }, [pathname]);

  const toogleModal = () => {
    setModalLogin(!ModalLoginOpen);
  };

  const toggleModalGeneral = () => {
    setModalGeneralOpen(!modalGeneralOpen);
  };

  const togggleModalAcceptQuotation = () => {
    setModalAcceptQuotation(!modalacceptquotation);
  };

  const viewFilter = () => {
    setFilter(!filter);
  };

  return (
    <AppContext.Provider
      value={{
        ModalLoginOpen,
        toogleModal,
        themeButton,
        themeButtonSecond,
        viewFilter,
        filter,
        planSelected,
        setSelectedPlan,
        toggleModalGeneral,
        modalGeneralOpen,
        togggleModalAcceptQuotation,
        modalacceptquotation,
        messageModalGeneral,
        setMessageModalGeneral,
        filterRubric,
        setFilterRubric,
        filterCars, 
        setFilterCars,
        filterCity,
        setFilterCity
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
