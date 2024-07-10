import { ChildProps } from "postcss";
import { DashboardHeader } from "../ui/header/Dashboard";

export default function NavBarDashboardlayout({children}: {children: ChildProps}) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
