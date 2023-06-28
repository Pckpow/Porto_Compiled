import Image from "next/image";
import db from "../../../../database.json";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const [notelist, setNoteList] = useState(noteList);

  function searchTypingHandler(e) {
    e.preventDefault();
    setSearch(() => e.target.value);
  }

  useEffect(() => {
    const data = noteList();
    setNoteList(data);
  }, [search]);

  function noteList() {
    const list =
      search != ""
        ? db.food.filter((x) =>
            x.name.toLowerCase().includes(search.toLowerCase())
          )
        : null;

    return list ? list.sort((a, b) => a.date - b.date).reverse() : [];
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute z-0 aspect-square w-full -translate-y-3/4 scale-[120%] rounded-full bg-orange-500" />
      <div className="flex h-full w-full flex-col items-center justify-center">
        {
          /* SearchBar */
          <div className="search__container">
            <h1 className="z-50 text-center text-3xl font-bold text-white">
              Mau Makan Apa Hari Ini? <sini class=""></sini>
            </h1>
            <SearchBar
              onTyping={searchTypingHandler}
              list={notelist}
              search={search}
            />
          </div>
        }
        {/* Gambar Nasi */}
        <div className="bowl-slide z-0 mt-12">
          <Image
            src="/assets/bowl-home.png"
            width={600}
            height={600}
            alt=""
            className="bowl-animate w-[500px]"
          />
        </div>
      </div>
    </section>
  );
}
