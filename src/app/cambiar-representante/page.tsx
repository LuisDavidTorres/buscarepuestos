import { DashboardHeader } from "../ui/header/Dashboard";
import { ChangeRepresentative } from "../ui/forms/Change-representative";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <div className="p-10 md:p-10 flex justify-center dark:text-black">
        <div className="shadow-md p-10">
          <h1 className="font-bold text-3xl mb-10">Cambiar Representante</h1>
          <ChangeRepresentative />
        </div>
      </div>
    </div>
  );
}
