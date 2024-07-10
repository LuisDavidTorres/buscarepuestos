import Link from "next/link";
import { MenuCloseUser } from "../Dropdown/Menu-close-user";
import { ClicksUser } from "../clicks/Clicks-user";

export function DashboardHeader() {
  return (
    <div className="h-full">
      <nav className="bg-white p-4 flex justify-between items-center border-b-4">
        <section className="flex justify-start sm:flex text-sm gap-2">
        <Link href="/home">
            <img
              src="/logo-images/logo-center-header.png"
              alt="Busca Repuestos"
              width={260}
              height={500}
              className="hidden sm:block"
            ></img>
            <img
              src="/logo-images/logo-start-header.png"
              alt="Busca Repuestos"
              width={63}
              height={40}
              className="sm:hidden"
            ></img>
          </Link>
        </section>
        <div className="flex flex-row items-center space-x-5">
          <section>
            <ClicksUser />
          </section>
          <section>
            <MenuCloseUser />
          </section>
        </div>
      </nav>
    </div>
  );
}
