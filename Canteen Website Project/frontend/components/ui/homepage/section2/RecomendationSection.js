import CarouselRecomendation from "./CarouselRecomendation";
import DescriptionRecomendation from "./DescriptionRecomendation";
import db from "../../../../database.json";
import { useState } from "react";

export default function RecomendationSection() {
  const [selectedFood, setSelectedFood] = useState(0);
  const recomended = db.food.filter((x) => x.recomended);

  return (
    <section className="py-8">
      <div
        id="Recommendations"
        className="mx-auto flex h-full max-w-8xl flex-col items-center justify-evenly rounded-3xl bg-[#FFAD4D]  py-16 px-12 text-center shadow-2xl"
      >
        <h1 className="mb-7 font-poppins text-4xl font-bold">
          Recomended For You
        </h1>
        <div className="flex w-full items-center justify-center space-x-5">
          <CarouselRecomendation
            food={recomended}
            setSelectedFood={setSelectedFood}
          >
            <style jsx>{`
              .swiper-slide-next img,
              .swiper-slide-prev img {
                opacity: 0.5;
              }

              .swiper-slide-next .desc,
              .swiper-slide-prev .desc {
                opacity: 0.5;
              }

              .swiper-slide-next .stars svg,
              .swiper-slide-prev .stars svg {
                fill: rgb(248 212 72 / 0.5) !important;
                color: rgb(248 212 72 / 0) !important;
              }

              .swiper-slide {
                opacity: 0;
              }
              .swiper-slide-prev,
              .swiper-slide-active,
              .swiper-slide-next {
                opacity: 1;
              }

              .swiper {
                padding: 0 0 4rem 0 !important;
              }
            `}</style>
          </CarouselRecomendation>
          <DescriptionRecomendation selectedFood={recomended[selectedFood]} />
        </div>
      </div>
    </section>
  );
}
