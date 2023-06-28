import Link from "next/link";
import { useContext } from "react";
import { PopupContext } from "../../context/popup/popupContext";
import Xmark from "../../public/assets/xmark.svg";

export default function PopupSign() {
  const { dispatch } = useContext(PopupContext);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center ">
      <div
        onClick={() => dispatch({ type: "CLICK" })}
        className="absolute h-full w-full bg-black/50"
      />
      <div className="relative mx-auto flex h-1/2 max-w-sm flex-col items-start justify-start space-y-5 rounded-xl bg-white px-10 py-3">
        <div
          onClick={() => dispatch({ type: "CLICK" })}
          className="absolute top-2 right-2 cursor-pointer rounded-full bg-orange-500 p-1"
        >
          <Xmark className="h-7 w-7 fill-main-white" />
        </div>
        <h1 className="font-poppins text-2xl font-bold">
          Sign In Terlebih Dahulu
        </h1>
        <Link
          href="/login"
          onClick={() => {
            dispatch({ type: "CLICK" });
            // dispatchUser({ type: "SIGN_IN" });
          }}
        >
          <button className="rounded-xl bg-orange-500 py-2 px-4 font-semibold text-white">
            Sign In
          </button>
        </Link>
        <h2 className="text-xl font-semibold">Belum Memiliki Akun?</h2>
        <Link href="/signup" onClick={() => dispatch({ type: "CLICK" })}>
          <button className="rounded-xl border-2 border-orange-500 py-2 px-4 font-semibold text-orange-500">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
