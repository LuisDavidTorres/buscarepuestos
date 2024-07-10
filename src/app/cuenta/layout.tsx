import { ReactNode } from "react";
import { DashboardHeader } from "../ui/header/Dashboard";
import { AccountSideNav } from "../ui/cards/Account-side-nav";
import { MenuAccountDropDown } from "../ui/Dropdown/Menu-account";

export default function NavBarDashboardlayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col md:flex-row p-4 md:p-8 justify-center items-center md:items-stretch bg-white">
        <div className="w-full md:hidden mb-5">
          <MenuAccountDropDown />
        </div>
    

        <div className="hidden md:block w-2/12 shadow-lg">
          <AccountSideNav />
        </div>
        <div className="w-11/12 md:w-2/4 shadow-lg">{children}</div>
      </div>
    </>
  );
}
