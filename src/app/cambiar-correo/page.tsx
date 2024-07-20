import { DashboardHeader } from "../ui/header/Dashboard";
import { ChangeEmail } from "../ui/forms/Change-email";
import { ModalGeneral } from "../ui/modals/Modal-general";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="p-10 md:p-10 flex justify-center xl:justify-center dark:text-black">
        <div className="shadow-md p-10">
          <h1 className="font-bold text-3xl mb-10">Actualizar Correo</h1>
          <ChangeEmail />
        </div>
      </div>
      <ModalGeneral />
    </div>
  );
}
