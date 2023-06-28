import CarouselMenu from "./CarouselMenu";
import ListMenu from "./ListMenu";
import db from "../../../../database.json";
import { useState } from "react";
import ProgressBarStep from "./ProgressBar2";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const menu =
    selectedCategory == "All"
      ? db.food
      : db.food.filter((item) =>
          item.categories.find((x) => x.name === selectedCategory)
        );

  return (
    <section className="mx-auto mt-14 flex max-w-8xl flex-col items-center justify-center">
      <h1 id="Categories" className="mb-12 text-4xl font-semibold">
        Our Menu😊
      </h1>
      {/* Progress Bar */}
      <ProgressBarStep step={1} />
      {/* Carousel Category */}
      <CarouselMenu setSelectedGlobal={setSelectedCategory} />
      {/* Card */}
      <ListMenu menu={menu} />
    </section>
  );
}
