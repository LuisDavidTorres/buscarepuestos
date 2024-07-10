import Image from "next/image";
import Img from "../../../../public/logo-images/home-page-fondo.png";
export default function Background() {
  return (
    <Image
      src={Img}
      placeholder="blur"
      fill
      alt="Background"
      sizes="100vw"
      style={{
        objectFit: "cover",
        zIndex: -1,
      }}
    />
  );
}
