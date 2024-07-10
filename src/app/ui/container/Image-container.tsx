"use client";

import { Carousel } from "../container/carousel";

interface images {
  idImg: number;
  idQuotation: number;
  url: string;
}

//funcion para eliminar cache
function noCache() {
  return {
    cache: "no-cache",
    headers: {
      Pragma: "no-cache",
    },
  };
}

export function ImageContainer({ images }: { images: images[] }) {
  noCache();
  return (
    <div className="shadow-2xl rounded-md">
      <Carousel>
        {images?.map((s) => (
          <img key={s.idImg} className="rounded-xl" src={s.url} alt="imagen"/>
        ))}
      </Carousel>
    </div>
  );
}
