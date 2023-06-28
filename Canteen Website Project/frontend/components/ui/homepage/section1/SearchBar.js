import React, { useEffect } from "react";
import { MdSearch } from "react-icons/md";

function SearchBar({ onTyping, list, search }) {
  const [active, setactive] = React.useState(false);
  useEffect(() => {
    search != "" ? setactive(true) : setactive(false);
  }, [search]);
  return (
    <div style={{ contain: "" }} className="note__search-container">
      <div className={`note__search-wrapper ${active ? "active" : ""}`}>
        <MdSearch className="search-icons" size="2em" />
        <input
          className="search__input"
          type="text"
          value={search}
          placeholder="Cari makananmu di sini....."
          onChange={onTyping}
        />
      </div>
      {/* {list.length > 0 && */}
      <div
        className={`note__search-item-result transition-all ${
          list.length > 0 ? " opacity-100" : "opacity-0"
        }`}
      >
        {list.map((item) => (
          <div className="note__search-item" key={item.id}>
            <ul>{item.name}</ul>
          </div>
        ))}
      </div>
      {/* } */}
    </div>
  );
}

export default SearchBar;
