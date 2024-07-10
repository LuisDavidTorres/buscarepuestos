import React from "react";
// import function to register Swiper custom elements
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel, Keyboard } from 'swiper/modules';

import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import 'swiper/css/keyboard'

export function Navbar() {
  return (
    <div className="w-11/12 border-2 mt-4 p-2">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel, Keyboard]}
        spaceBetween={50}
        slidesPerView={10}
        keyboard={{ enabled: true }} // Habilita la funcionalidad del teclado
        mousewheel={true} // Habilita la funcionalidad del mousewheel
        autoplay={{ delay: 2000 }} // Configura el autoplay aquí
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide><img height={50} width={50} alt="imagen" src="/cars-images/Chevrolet.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfindernissanlogo4142910-115961_115919.png"/></SwiperSlide>

        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfinderbmwlogo4140436-115966_115915.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfindervwlogo4140434-115963_115918.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfindermercedeslogo4140438-115958_115923.png"/></SwiperSlide>
        
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfinderfordlogo4141776-115957_115924.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfindersubarulogo4141660-115970_115911.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfindercitroenlogo4143278-115962_115920.png"/></SwiperSlide>

        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://cdn.icon-icons.com/icons2/1834/PNG/512/iconfindermercedeslogo4140438-115958_115923.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://e7.pngegg.com/pngimages/240/984/png-clipart-suzuki-logo-suzuki-carry-suzuki-carry-suzuki-jimny-honda-logo-suzuki-angle-emblem-thumbnail.png"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEl0Yajwous3a4U-X2kTdRNJGYb9PGIyEV4wr1E-0jOg&s"/></SwiperSlide>
        <SwiperSlide><img height={50} width={50} alt="imagen" src="https://logowik.com/content/uploads/images/jac-motors5223.logowik.com.webp"/></SwiperSlide>
        
      </Swiper>
    </div>
  );
}

