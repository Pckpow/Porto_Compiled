import Image from "next/image";
import IconStar from "../../../../public/assets/star.svg";
import Plus from "../../../../public/assets/plus-solid.svg";
import Minus from "../../../../public/assets/minus-solid.svg";
import CirclePlus from "../../../../public/assets/circle-plus-solid.svg";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../context/cart/cartContext";
import { UserContext } from "../../../../context/user/userContext";
import { PopupContext } from "../../../../context/popup/popupContext";
import { formatRupiah } from "../../../../utils/formater";

export default function ListMenu({ menu }) {
  return (
    <div
      className={`flex w-full flex-wrap items-center ${
        menu.length > 3
          ? "justify-between"
          : "mr-auto justify-start gap-x-[38px]"
      } gap-y-5 pb-16`}
    >
      {menu.map((item) => (
        <CardMenu key={item.id} {...item} />
      ))}
    </div>
  );
}

function CardMenu({ name, price, img, rating, categories, description }) {
  const favorite = categories.find((x) => x.name == "Favorite");
  const percentage = Math.round((rating / 5) * 100);
  //   const [quantity, setQuantity] = useState(0);
  const [hover, setHover] = useState(false);
  const { dispatch, state: cartState } = useContext(CartContext);

  const { state: userState } = useContext(UserContext);
  const { dispatch: dispatchPopup } = useContext(PopupContext);

  const quantity = cartState.cart.find((x) => x.name == name)?.quantity || 0;

  function add({ name, price, img, rating, categories }) {
    if (userState.isLogin) {
      //   setQuantity((x) => x + 1);
      dispatch({
        type: "ADD_TO_CART",
        payload: { name, price, img, rating, categories },
      });
    } else {
      dispatchPopup({ type: "CLICK" });
    }
  }

  function remove({ name, price, img, rating, categories }) {
    // setQuantity((x) => x - 1);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { name, price, img, rating, categories },
    });
  }

  return (
    <div className="flex basis-[23%] flex-col items-center justify-center">
      <div>
        <div className="relative px-2">
          <div className="group relative overflow-hidden">
            <Image
              src={img}
              width={600}
              height={600}
              alt=""
              className="aspect-[5/3] rounded-3xl"
            />
            <div className="absolute bottom-0 left-0 h-full w-full translate-y-48 rounded-3xl bg-white/70 py-2 pl-3 pr-9 text-xl font-semibold opacity-100 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              {description}
            </div>
          </div>
          <svg
            className="absolute top-2 right-4 h-8 w-8 cursor-pointer"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <circle cx="30" cy="30" r="30" fill="#FBFAF5" />
            <rect
              x="9"
              y="4.5"
              width="43.4962"
              height="49.7099"
              fill="url(#pattern0)"
              onPointerEnter={() => setHover(true)}
              onPointerLeave={() => setHover(false)}
              fillOpacity={favorite || hover ? "1" : "0.7"}
              className="hover:opacity-100"
            />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_402_142"
                  transform="translate(0 0.0625) scale(0.01 0.00875)"
                />
              </pattern>
              <image
                id="image0_402_142"
                width="100"
                height="100"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
        <div className="-mt-24 flex flex-col rounded-xl bg-white px-4 pt-28 pb-5 shadow-xl">
          <h1 className="font-inder text-2xl">{name}</h1>
          <div className="stars relative mt-[1px] mr-auto flex">
            <div className="relative flex">
              {[...Array(5)].map((_, i) => (
                <IconStar key={i} className="fill-[#ffcc00] text-transparent" />
              ))}
              <div
                style={{ width: `${100 - percentage}%` }}
                className="overlay absolute top-0 right-0 bottom-0 z-10 bg-main-black opacity-70"
              />
            </div>
            <div className="mx-1 font-poppins font-semibold">{rating}</div>
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
          <div className="relative flex w-full items-center justify-between">
            <p className="text-xl font-semibold">
              <span className="text-xs font-bold text-orange-500">Rp.</span>
              {formatRupiah(price)}
            </p>
            {/* <div className="flex items-center justify-start"> */}
            <button
              onClick={() => add({ name, price, img, rating, categories })}
              className={`${
                quantity === 0 ? "z-0 opacity-100" : "-z-10 opacity-0"
              }transition-opacity delay-200`}
            >
              <CirclePlus className="h-8 w-8 fill-orange-500" />
            </button>
            <div
              className={`absolute right-0 flex items-center ${
                quantity === 0 ? "-z-10 opacity-0" : "z-0 opacity-100"
              } justify-start space-x-3 transition-opacity delay-200`}
            >
              <style jsx>{`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
          }
        `}</style>
              <button
                disabled={quantity == 0}
                onClick={() => remove({ name, price, img, rating, categories })}
              >
                <Minus className="h-4 w-4 fill-orange-500" />
              </button>
              <input
                className="h-8 w-8 rounded-2xl text-center text-lg"
                type="number"
                value={quantity}
                onChange={(e) => {}}
                // onChange={(e) => setQuantity(parseInt(e.target.value))}
                // onPointerOut={(e) => {
                //   isNaN(quantity) && setQuantity(0);
                // }}
              />
              <button
                onClick={() => {
                  add({ name, price, img, rating, categories });
                }}
              >
                <Plus className="h-4 w-4 fill-orange-500" />
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
