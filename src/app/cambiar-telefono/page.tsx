import { ChangePhoneNumber } from "../ui/forms/Change-phone-number";
import { DashboardHeader } from "../ui/header/Dashboard";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="p-10 md:p-10 flex justify-center">
        <div className="shadow-md p-10">
          <h1 className="font-bold text-3xl mb-10">Actualizar Teléfono</h1>
          <ChangePhoneNumber />
        </div>
      </div>
    </div>
  );
}
