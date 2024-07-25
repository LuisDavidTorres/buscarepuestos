"use client";

import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import { Plans } from "@/app/ui/cards/Plans";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export function CarouselFlowbite({ plans }) {
  const [autoplay, setAutoplay] = useState(true);

  var settings = {
    dots: true,
    infinite: true,
    autoplay: autoplay,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="mt-8"
            onTouchStart={() => {
              setAutoplay(false);
            }}
          >
            <Plans plan={plan} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
