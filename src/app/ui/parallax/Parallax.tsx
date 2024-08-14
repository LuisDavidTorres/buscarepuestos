import Image from "next/image";

export default function Parallax() {
  return (
    <div>
      <div className="relative">
        <Image
          src={"/images/backgrounds/Fondo_BR_home_index.webp"}
          alt="Busca Repuestos"
          className="w-full"
          width={1920}
          height={400}
          priority={true}
          quality={100}
        />
        <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-t from-zinc-700/20 to-transparent">
          <div className="bg-white/40 p-6 rounded-lg shadow-2xl backdrop-blur-sm max-w-md mx-4 text-center">
            <h2 className="text-gray-700 font-bold max-[404px]:text-xl text-3xl md:text-4xl lg:text-5xl leading-tight">
              <span className="text-gray-700/90">Fácil,</span>
              <span className="text-gray-700/85"> Rápido</span>
              <span className="text-gray-700/80"> y Seguro</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
