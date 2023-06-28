import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CircleRight from "../../../../public/assets/circle-right.svg";

export default function CarouselMenu({ setSelectedGlobal }) {
  const swiperRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [buttonAct, setButtonAct] = useState(0);
  const categories = [
    "All",
    "Favorite",
    "Fast Food",
    "Meat",
    "Healthy",
    "Drink",
  ];

  return (
    <div className="flex w-full items-center justify-center">
      <button
        disabled={buttonAct == 0}
        onClick={() => swiperRef.current?.slidePrev()}
        className="mb-16 mr-5"
      >
        <CircleRight
          className={`h-12 w-12 rotate-180 fill-orange-500 transition-all ${
            buttonAct == 0 ? "opacity-50" : "hover:scale-110"
          }`}
        />
      </button>
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setButtonAct(swiper.realIndex);
        }}
        spaceBetween={30}
        slidesPerView={5}
        className="menu w-full"
      >
        {categories.map((item, i) => (
          <SwiperSlide key={i}>
            <CategoryCard
              index={i}
              isActive={selectedCategory === i}
              setSelectedCategory={setSelectedCategory}
              name={item}
              setSelectedGlobal={setSelectedGlobal}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        disabled={buttonAct == Math.floor(categories.length - 5)}
        onClick={() => swiperRef.current?.slideNext()}
        className="mb-16 ml-5"
      >
        <CircleRight
          className={`h-12 w-12 fill-orange-500 transition-transform ${
            buttonAct == Math.floor(categories.length - 5)
              ? "opacity-50"
              : "hover:scale-110"
          }`}
        />
      </button>
    </div>
  );
}

function CategoryCard({
  index,
  isActive,
  setSelectedCategory,
  name,
  setSelectedGlobal,
}) {
  return (
    <div
      onClick={() => {
        setSelectedCategory(index), setSelectedGlobal(name);
      }}
      className={`group flex cursor-pointer flex-col items-center  justify-center space-y-2 rounded-xl py-5 transition-colors hover:bg-orange-400 hover:text-white ${
        isActive ? "bg-orange-500" : "bg-white"
      } shadow-xl`}
    >
      {/* Gambar pizza bg putih */}
      <div className="rounded-full bg-white">
        <Image
          src="/assets/pizza.png"
          width={100}
          height={100}
          alt=""
          className="h-14 w-14"
        />
      </div>
      <p className={`font-inder text-xl ${isActive && "text-white"}`}>{name}</p>
      <CircleRight
        className={`h-8 w-8 group-hover:fill-white ${
          isActive ? "fill-white" : "fill-orange-500"
        }`}
      />
    </div>
  );
}
