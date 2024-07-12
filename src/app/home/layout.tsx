import { ReactNode } from "react"; // Asegúrate de importar ReactNode
import { DashboardHeader } from "../ui/header/Dashboard";

export default function NavBarDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}

