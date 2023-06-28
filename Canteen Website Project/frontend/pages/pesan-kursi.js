import { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import CardWaitingList from "../components/ui/pesankursi/CardWaitingList";
import Keterangan from "../components/ui/pesankursi/Keterangan";
import MapKursi from "../components/ui/pesankursi/MapKursi";
import Waitlist from "../components/ui/pesankursi/waitinglist/Waitinglist";
import ProgressBarStep from "../components/ui/homepage/section3/ProgressBar2";
import { UserContext } from "../context/user/userContext";
import { useRouter } from "next/router";

export default function PesanKursi() {
  const router = useRouter();
  const hourNow = new Date().getHours();
  const minuteNow = new Date().getMinutes();
  const [hour, setHour] = useState(hourNow);
  const [minute, setMinute] = useState(minuteNow < 30 ? 0 : 30);
  const { state } = useContext(UserContext);

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
    <Layout withoutFooter={true}>
      <div className="mx-auto flex w-full max-w-8xl flex-col items-center justify-center">
        {/* Judul & Progress Bar */}
        <div className="flex w-full items-center justify-between py-12">
          {/* Judul */}
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">Choose Your Seat</h1>
            <p className="text-3xl font-medium">
              Tekan kursi yang ingin kamu pesan
            </p>
          </div>
          {/* ProgressBar */}
          <div className="relative -mb-5 flex w-8/12 items-center justify-center">
            <ProgressBarStep step={2} />
          </div>
        </div>

        {/* Daftar & Map */}
        <div className="flex h-full w-full items-start justify-between">
          {/* Daftar */}
          <div className="h-full w-1/3">
            <Waitlist
              hourNow={hourNow}
              minuteNow={minuteNow}
              hour={hour}
              setHour={setHour}
              minute={minute}
              setMinute={setMinute}
            />
            {/* <CardWaitingList /> */}
          </div>
          {/* Map */}
          <div className="flex w-2/3 flex-col space-y-5">
            <MapKursi
              hourNow={hourNow}
              minuteNow={minuteNow}
              hour={hour}
              setHour={setHour}
              minute={minute}
              setMinute={setMinute}
            />
            <div className="flex items-center justify-evenly">
              <Keterangan desc="Belum dipesan" color="rgb(217 217 217)" />
              <Keterangan desc="Dipilih" color="rgb(250 142 60)" />
              <Keterangan desc="Sudah dipesan" color="rgb(239 68 68)" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
