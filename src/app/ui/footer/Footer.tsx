import { IoLogoInstagram } from "react-icons/io5";
import { ImFacebook2 } from "react-icons/im";
import { IoIosLock } from "react-icons/io";
import { ButtonShare } from "../buttons/Share";
import { BsWhatsapp } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

export function Footer() {
  return (
    <div className="flex flex-col">
      <footer className="bg-neutral-700 mt-auto text-white">
        <div className="p-5">
          <ul>
            <li>
              <Link
                href="/terminos"
                className=" text-gray-100 text-xs md:text-sm hover:text-white"
              >
                Terminos y Política de Privacidad
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex justify-between flex-row items-center">
            <img
              className="rounded-md"
              width={150}
              src="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_REV_SQ.8c88ac215fe4e441dc42865dd6962ed4f444a90d.png"
              alt="Powered by AWS Cloud Computing"
            ></img>
            <section className="flex justify-end space-x-4">
              <BsWhatsapp />
              <Link
                href="https://www.instagram.com/buscarepuestos.cl?igsh=OGQ5ZDc2ODk2ZA%3D%3D"
                target="_blank"
              >
                <IoLogoInstagram />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61558572538935"
                target="_blank"
              >
                {" "}
                <ImFacebook2 />
              </Link>
              <Link
                href="#"
                target="_blank"
              >
                {" "}
                <FaLinkedin />
              </Link>
              <ButtonShare />
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
