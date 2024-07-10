import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LinkSingOut } from "@/app/ui/ListComponents/SingOut";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full">
      <header className="bg-white p-4 flex justify-between items-center border-b-4">
          <Link href="/">
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
        {session && <LinkSingOut />}
      </header>
    </div>
  );
}

export default Header;
