"use client";

import { createContext, useState, useContext } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [ModalLoginOpen, setModalLogin] = useState(false);
  const [modalGeneralOpen, setModalGeneralOpen] = useState(false);
  const [modalacceptquotation, setModalAcceptQuotation] = useState(false);
  const [messageModalGeneral, setMessageModalGeneral] = useState([]);
  const [filter, setFilter] = useState(false);

  const [themeButton, setThemeButton] = useState(
    "bg-custom-green p-2 rounded-md text-white w-28 hover:bg-green-700 text-center text-sm"
  );

  const [themeButtonSecond, setThemeButtonSecond] = useState(
    "bg-custom-green p-2 rounded-md text-white w-32 hover:bg-green-700 text-center"
  );

  const [planSelected, setSelectedPlan] = useState({
    name: null,
    price: null,
  });

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
