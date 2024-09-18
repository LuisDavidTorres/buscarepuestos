import { ReactNode } from "react";
import { DashboardHeader } from "../ui/header/Dashboard";
import { HeaderOut } from "../ui/header/Out";
import { getServerSession } from "next-auth";

export default async function NavBarDashboardLayout({ children }: { children: ReactNode }) {

  const session = await getServerSession();

  return (
    <>
      {session ? <DashboardHeader /> : <HeaderOut/> }
      {children}
    </>
  );
}

