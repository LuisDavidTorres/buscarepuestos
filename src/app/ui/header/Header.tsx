import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";
import { LinkSingOut } from "@/app/ui/ListComponents/SingOut";
import Image from "next/image";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-full">
      <header className="bg-white p-2 flex justify-between items-center border-b-4">
        <Link href="/">
          <Image
            src="/logo-images/logo-center-header.png"
            alt="Busca Repuestos"
            width={260}
            height={56}
            className="hidden sm:block"
            quality={100}
          />
          <Image
            src="/logo-images/logo-start-header.png"
            alt="Busca Repuestos"
            width={63}
            height={63}
            className="sm:hidden"
            quality={100}
          />
        </Link>
        {session && (
          <button className="bg-red-600 p-2 rounded-md hover:bg-red-700">
            <LinkSingOut />
          </button>
        )}
      </header>
    </div>
  );
}

export default Header;
