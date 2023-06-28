import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { KursiContext } from "../../context/pesankursi/kursiContext";
import { UserContext } from "../../context/user/userContext";
import { timeDifferent } from "../../utils/formater";
import ProgressBarStep from "/components/ui/homepage/section3/ProgressBar2";

export default function PaymentMethod() {
  const { state } = useContext(UserContext);
  const { state: cartState } = useContext(KursiContext);
  const { hour, minute, hourNow } = cartState;
  timeDifferent(hour, minute, hourNow, new Date().getMinutes(), 60);

  const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };

  const isMount = useIsMount();

  useEffect(() => {
    if (!isMount) {
      if (!state.isLogin) {
        router.push("/login");
      }
    }
  }, [isMount, state]);
  return (
    <section>
      <div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-center">
        <div className="flex w-full items-center justify-between py-12">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">Pembayaran</h1>
            <p className="text-3xl font-medium">Pilih metode pembayaran</p>
          </div>
          <div className="-mb-5 flex w-8/12 items-center justify-center">
            <ProgressBarStep step={3} />
          </div>
        </div>
        <div class="flex items-center justify-center text-center">
          <div class="flex">
            <div class="flex px-2">
              <Link href="/confirm">
                <div
                  class="m-auto aspect-square rounded-2xl bg-orange-500 py-8 px-10 text-xl font-bold shadow-2xl hover:bg-orange-700"
                  href="#"
                >
                  <Image
                    width={200}
                    height={200}
                    src="/credit.svg"
                    class="py-5"
                  />
                  Credit
                </div>
              </Link>
            </div>
            <div class="flex px-2">
              <Link href="/confirm">
                <div class="m-auto aspect-square rounded-2xl bg-orange-500 py-8 px-10 text-xl font-bold shadow-2xl hover:bg-orange-700">
                  <Image
                    width={200}
                    height={200}
                    src="/e-payment.svg"
                    class="-mt-2 py-5"
                  />
                  <div>E-Payment</div>
                </div>
              </Link>
            </div>
            <div class="flex px-2">
              <div
                onClick={() =>
                  !timeDifferent(
                    hour,
                    minute,
                    hourNow,
                    new Date().getMinutes(),
                    60
                  ) && router.push("/confirm")
                }
                class={`m-auto aspect-square rounded-2xl bg-orange-500 py-8 px-10 text-xl font-bold  shadow-2xl ${
                  timeDifferent(
                    hour,
                    minute,
                    hourNow,
                    new Date().getMinutes(),
                    60
                  )
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-orange-700"
                } `}
                href="#"
              >
                <Image width={200} height={200} src="/cash.svg" class="py-5" />
                Tunai di kasir
              </div>
            </div>
          </div>
        </div>
        {timeDifferent(hour, minute, hourNow, new Date().getMinutes(), 60) && (
          <div class=" py-2 px-4 text-2xl font-semibold text-red-600">
            Metode tunai tidak tersedia untuk reservasi di atas 1 jam
          </div>
        )}
      </div>
    </section>
  );
}
