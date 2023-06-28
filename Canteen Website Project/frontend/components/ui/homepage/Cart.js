import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/cart/cartContext";
import CartIcon from "../../../public/assets/cart.svg";
import { formatRupiah } from "../../../utils/formater";
import Xmark from "../../../public/assets/xmark.svg";

function Cart() {
  const { state } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.cart.length == 0) setIsOpen(false);
  }, [state]);

  return (
    <div className="fixed bottom-10 right-10 z-40">
      <div className="relative">
        <div
          onClick={() => setIsOpen(true)}
          className={`text-main relative cursor-pointer rounded-full bg-orange-500 p-4 ${
            state.cart.length > 0 && !isOpen ? "" : "-z-50 opacity-0"
          }`}
        >
          <CartIcon className="h-10 w-10 fill-white" />
          <div className="absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-3 font-semibold text-white">
            {state.cart.length}
          </div>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute bottom-0 right-0 flex w-[28rem] flex-col space-y-5 rounded-xl bg-white px-8 py-5 shadow-2xl ${
            isOpen ? "" : "-z-50 scale-0 cursor-default opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <div
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded-full bg-orange-500 p-1"
            >
              <Xmark className="h-7 w-7 fill-main-white" />
            </div>
          </div>
          <div className="flex max-h-72 flex-col space-y-5 overflow-y-auto pr-2">
            {state.cart.map((item, i) => (
              <CardCheckout key={i} {...item} />
            ))}
          </div>
          <div className="ml-auto w-auto rounded-xl bg-orange-500 py-1 px-2 font-semibold text-main-white">
            <Link href="/pesan-kursi">Pesan Kursi</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

function CardCheckout({ img, name, quantity, price }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center space-x-5">
        <Image
          src={img}
          width={80}
          height={80}
          alt=""
          className="aspect-square rounded-xl"
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p>
            Rp{formatRupiah(price)} x {quantity}
          </p>
        </div>
      </div>
      <p className="text-2xl">Rp{formatRupiah(price * quantity)}</p>
    </div>
  );
}
