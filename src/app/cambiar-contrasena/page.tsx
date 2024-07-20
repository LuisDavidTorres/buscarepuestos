import { ChangePassword } from "../ui/forms/Change-password";
import { DashboardHeader } from "../ui/header/Dashboard";
import { ModalGeneral } from "../ui/modals/Modal-general";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:text-black">
      <DashboardHeader />
      <div className="p-10 md:p-10 flex justify-center">
        <div className="shadow-md p-10">
          <h1 className="font-bold text-3xl mb-10">Actualizar Contraseña</h1>
          <ChangePassword />
        </div>
      </div>
      <ModalGeneral />
    </div>
  );
}
