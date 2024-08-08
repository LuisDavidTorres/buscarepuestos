import Image from "next/image";

export default function Parallax() {
  return (
    <div>
      <div className="relative">
        <Image
          src="/images/backgrounds/Fondo_BR_home_index.webp"
          alt="Busca Repuestos"
          className="w-full h-[400px] object-cover bg-gradient-to-r from-cyan-500 to-blue-500"
          width={1920}
          height={400}
          priority={true}
          quality={100}
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="bg-white/40 p-6 rounded-lg shadow-2xl backdrop-blur-sm max-w-md mx-4 text-center">
            <h2 className="text-gray-700 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
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
