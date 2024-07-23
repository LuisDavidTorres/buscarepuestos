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
          <div className="mt-4 flex justify-between flex-col md:flex-row">
            <div className="w-full md:w-64">
              <div className="bg-neutral-600 p-2 rounded-md">
                <div className="flex justify-end w-full">
                  <svg
                    id="Capa_1"
                    data-name="Capa 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-350 0 1880 231.95"
                    className="flex justify-center"
                  >
                    <rect
                      x="9.72"
                      y="11.63"
                      width="1060.56"
                      height="208.69"
                      rx="11.56"
                      fill="none"
                      stroke="white"
                      stroke-width="2"
                    />
                    <text
                      transform="translate(42.46 139.75)"
                      fill="white"
                      font-size="107.86px"
                      font-family="Arial-BoldMT, Arial;font-weight:700"
                    >
                      BuscaRepuestos.cl
                    </text>
                    <path
                      d="M337.37,168.68l143.9,16c14.12.54,18.37-3.29,18.37-8.22V151.65Z"
                      fill="#4CAF50"
                      transform="translate(-20, 3)"
                    />
                  </svg>
                </div>
                <p className="text-left text-xs mt-2">
                  Es una plataforma que simplifica la forma en que se buscan y
                  adquieren repuestos automotrices. Estamos comprometidos con
                  brindar una experiencia de búsqueda rápida, fácil y segura
                  para Clientes, Buscadores y Distribuidores, contribuyendo a un
                  mercado más eficiente, transparente y competitivo.
                </p>
              </div>
              <section className="flex justify-center lg:justify-start mt-4 lg:mx-2 space-x-4">
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
            <div className="mt-5 md:mt-0">
              <h6>Legal</h6>
              <hr></hr>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/terminos"
                    className=" text-gray-100 text-xs lg:text-sm hover:text-white hover:underline"
                  >
                    Terminos y Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-5 md:mt-0">
              <h6>Centro de ayuda</h6>
              <hr></hr>
              <section className="mt-4 flex flex-col space-y-2">
                <a
                  href="mailto:contacto@buscarepuestos.cl"
                  className="text-gray-100 text-xs lg:text-sm hover:text-white"
                >
                  contacto@buscarepuestos.cl
                </a>
                <a
                  href="mailto:contacto@buscarepuestos.cl"
                  className="text-gray-100 text-xs lg:text-sm hover:text-white"
                >
                  soporte@buscarepuestos.cl
                </a>
              </section>
            </div>

            <div className="w-52 xl:w-64 hidden xl:block">
              <Image
                src={"/logo-images/logos-horizontal-footer.webp"}
                alt="Busca Repuestos"
                className="mt-52"
                width={270}
                height={10}
                quality={100}
              />
            </div>
          </div>

          <section className="flex flex-col justify-center text-xs lg:text-sm mt-5">
            {" "}
            <div className="w-52 xl:hidden">
              <Image
                src={"/logo-images/logos-horizontal-footer.webp"}
                alt="Busca Repuestos"
                className="mb-4"
                width={270}
                height={10}
                quality={100}
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="mx-1">© 2024 BuscaRepuestos.cl</p>
              <IoIosLock className="w-[15px] h-[12px] md:w-4 md:h-4" />
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
