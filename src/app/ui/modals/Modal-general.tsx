"use client";

import { TfiClose } from "react-icons/tfi";
import { useMemo } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

export function ModalGeneral() {
  const { toggleModalGeneral, modalGeneralOpen, messageModalGeneral } =
    useAppContext();
  const router = useRouter();

  const onClick = () => {
    router.push("/cambiar-plan");
    toggleModalGeneral();
  };

  const modalContent = useMemo(() => {
    if (modalGeneralOpen) {
      return (
        <div className="fixed top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="rounded-md bg-white p-4 xl:h-2/5 xl:w-2/5 w-11/12">
            <section className="flex md:justify-end justify-start">
              <div
                className="cursor-pointer p-2 hover:bg-slate-400 rounded-full"
                onClick={toggleModalGeneral}
              >
                <TfiClose className="text-black" />
              </div>
            </section>
            <div className="flex text-center flex-col space-y-14">
              <section className="mt-16">
                <p className="text-base">{messageModalGeneral.text}</p>
              </section>
              {messageModalGeneral.id === 1 && (
                <section>
                  <button
                    onClick={onClick}
                    className="p-2 rounded-md text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Obtener mas clicks
                  </button>
                </section>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }, [modalGeneralOpen, toggleModalGeneral, messageModalGeneral, onClick]);

  return <>{modalContent}</>;
}
