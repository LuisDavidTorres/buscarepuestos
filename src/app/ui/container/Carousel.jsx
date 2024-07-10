"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useState } from "react";

export function Carousel({ children: slides }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(0);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      setCurrent(slides.length - 1);
    }
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <BiChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <BiChevronRight size={40} />
        </button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-3 h-3 bg-black rounded-full
              ${current === i ? "p-2" : "bg-opacity-50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
