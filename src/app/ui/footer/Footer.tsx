import { BsInstagram } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { IoIosLock } from "react-icons/io";
import { ButtonShare } from "../buttons/Share";
import { BsLinkedin } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <div className="flex flex-col">
      <footer className="bg-neutral-700 mt-auto text-white">
        <div className="p-5">
          <ul>
            <li>
              <Link
                href="/terminos"
                className=" text-gray-100 text-xs md:text-sm hover:text-white hover:underline"
              >
                Terminos y Política de Privacidad
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex justify-between flex-row">
            <div className="w-24 xl:w-32">
              <Image
                src={"/logo-images/logos-vertical-footer.webp"}
                alt="Busca Repuestos"
                className="-mt-2"
                width={270}
                height={10}
                quality={100}
              />
            </div>
            <section className="flex justify-end space-x-4">
              <Link
                href="https://www.instagram.com/buscarepuestos.cl?igsh=OGQ5ZDc2ODk2ZA%3D%3D"
                target="_blank"
                aria-label="Instagram de BuscaRepuestos"
              >
                <BsInstagram />
                <span className="sr-only">Instagram</span>{" "}
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61558572538935"
                target="_blank"
                aria-label="Perfil de Facebook de BuscaRepuestos"
              >
                <ImFacebook2 />
                <span className="sr-only">Facebook</span>{" "}
              </Link>
              <Link
                href="#"
                target="_blank"
                aria-label="Perfil de LinkedIn de BuscaRepuestos"
              >
                <BsLinkedin />
                <span className="sr-only">LinkedIn</span>{" "}
              </Link>
              <section>
                {" "}
                <ButtonShare />
              </section>
            </section>
          </div>

          <section className="flex justify-center items-center text-xs md:text-sm mt-5">
            <p className="mx-1">© 2024 BuscaRepuestos.cl</p>
            <IoIosLock className="w-[15px] h-[12px] md:w-4 md:h-4" />
          </section>
        </div>
      </footer>
    </div>
  );
}
