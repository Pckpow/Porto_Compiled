import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/core";

import "swiper/css";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import IconStar from "../../../../public/assets/star.svg";
import CircleRight from "../../../../public/assets/circle-right.svg";
import { useRef } from "react";
import { formatRupiah } from "../../../../utils/formater";

export default function CarouselRecomendation({ food, setSelectedFood }) {
  const swiperRef = useRef();

  return (
    <div className="flex w-3/5 flex-col items-center">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={2.8}
        // slidesPerView="auto"
        spaceBetween={10}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        className={"recomendation w-full"}
        onSlideChange={(swiper) => {
          setSelectedFood(() => swiper.realIndex);
        }}
      >
        {food.map((item, index) => (
          <SwiperSlide className="recomendation" key={index}>
            <CardComponent {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="z-10 -mt-7 flex space-x-12">
        <button onClick={() => swiperRef.current?.slidePrev()}>
          <CircleRight className="h-12 w-12 rotate-180 fill-main-white transition-all hover:scale-110" />
        </button>
        <button onClick={() => swiperRef.current?.slideNext()}>
          <CircleRight className="h-12 w-12 fill-main-white transition-transform hover:scale-110" />
        </button>
      </div>
    </div>
  );
}

function CardComponent({ img, name, price, rating }) {
  const percentage = Math.round((rating / 5) * 100);

  return (
    <div className="flex w-auto flex-col items-center justify-center rounded-xl bg-main-white p-5 shadow-2xl">
      <Image
        src={img}
        width={600}
        height={600}
        alt=""
        className="aspect-square rounded-xl drop-shadow-2xl"
      />
      <div className="flex flex-col space-y-1 self-start">
        <div className="desc flex flex-col items-start">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-xl">Rp{formatRupiah(price)}</p>
        </div>
        <div className="stars relative mr-auto flex">
          {[...Array(5)].map((_, i) => (
            <IconStar key={i} className="fill-[#f8d448] text-transparent" />
          ))}
          <div
            style={{ width: `${100 - percentage}%` }}
            className="overlay absolute top-0 right-0 bottom-0 z-10 bg-main-black opacity-70"
          />
          <style jsx>
            {`
              @supports (mix-blend-mode: color) {
                .overlay {
                  mix-blend-mode: color;
                  opacity: unset;
                }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
}
