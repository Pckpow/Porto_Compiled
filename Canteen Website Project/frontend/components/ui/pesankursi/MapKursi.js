import { useContext, useEffect, useState } from "react";
import { KursiContext } from "../../../context/pesankursi/kursiContext";
import { formatJam, timeBetween } from "../../../utils/formater";

export default function MapKursi({
  hourNow,
  minuteNow,
  hour,
  setHour,
  minute,
  setMinute,
}) {
  return (
    <div className="flex w-full items-center justify-between overflow-hidden rounded-2xl border-4 border-main-black">
      {/* kiri */}
      <div className="flex w-1/12 flex-col justify-center">
        <div className="h-12 w-12 rounded-br-full border-t-4 border-r-4 border-b-4 border-main-black"></div>
        <div className="h-12 w-12 rounded-tr-full border-t-4 border-r-4 border-b-4 border-main-black"></div>
      </div>

      {/* tengah */}
      <div className="flex w-9/12 flex-col space-y-8">
        {/* Meja atas */}
        <MejaPaketPanjang
          hourNow={hourNow}
          minuteNow={minuteNow}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          top={true}
          start={1}
        />
        {/* Meja kotak row 1 */}
        <RowMeja
          hourNow={hourNow}
          minuteNow={minuteNow}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          start={8}
        />
        {/* Meja kotak row 2 */}
        <RowMeja
          hourNow={hourNow}
          minuteNow={minuteNow}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          start={24}
        />
        {/* Meja bawah */}
        <MejaPaketPanjang
          hourNow={hourNow}
          minuteNow={minuteNow}
          hour={hour}
          setHour={setHour}
          minute={minute}
          setMinute={setMinute}
          top={false}
          start={40}
        />
      </div>

      {/* kanan */}
      <div className="w-2/12">
        <div
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          className="ml-auto -mr-1 flex h-[70.5%] w-32 items-center justify-center rounded-l-3xl bg-gray-map text-3xl font-semibold text-main-black"
        >
          KASIR
        </div>
      </div>
    </div>
  );
}

function Kursi({ no, paket, hovering, setkursiHovering }) {
  const { dispatch, state } = useContext(KursiContext);
  const { hour, minute, bookingEndTime, bookingEndMinute } = state;
  const isSelected = state.selectedChair.includes(no);
  const filter = state.usedChair.filter((i) => i.chairs.includes(no));
  const [isUsed, setIsUsed] = useState(false);

  useEffect(() => {
    setIsUsed(
      filter.length > 0 &&
        (timeBetween(
          filter[0]?.start.hour,
          filter[0]?.start.minute,
          filter[0]?.end.hour,
          filter[0]?.end.minute,
          hour,
          minute
        ) ||
          timeBetween(
            filter[0]?.start.hour,
            filter[0]?.start.minute,
            filter[0]?.end.hour,
            filter[0]?.end.minute,
            bookingEndTime,
            bookingEndMinute,
            true
          ) ||
          timeBetween(
            hour,
            minute,
            bookingEndTime,
            bookingEndMinute,
            filter[0]?.end.hour,
            filter[0]?.end.minute,
            true
          ) ||
          timeBetween(
            hour,
            minute,
            bookingEndTime,
            bookingEndMinute,
            filter[0]?.start.hour,
            filter[0]?.start.minute
          ))
    );
  }, [hour, minute, filter]);

  //   (filter[0]?.start.hour < hour ||
  //     (filter[0]?.start.minute == minute && filter[0]?.start.hour == hour)) &&
  //   filter[0]?.end.hour > bookingEndTime) ||
  // (filter[0]?.end.minute == bookingEndMinute &&
  //   filter[0]?.end.hour == bookingEndTime);

  return (
    <button
      disabled={isUsed}
      onPointerEnter={() =>
        !isUsed && setkursiHovering && setkursiHovering(true)
      }
      onPointerLeave={() => setkursiHovering && setkursiHovering(false)}
      onClick={() => {
        if (isSelected) {
          //   if (paket) {
          //     const start = no - (no % 4);
          //     for (let i = start; i < start + 4; i++) {
          //       dispatch({ type: "REMOVE_CHAIR", payload: i });
          //     }
          //   } else {
          dispatch({ type: "REMOVE_CHAIR", payload: no });
          //   }
        } else {
          //   if (paket) {
          //     const start = no - (no % 4);
          //     for (let i = start; i < start + 4; i++) {
          //       dispatch({ type: "ADD_CHAIR", payload: i });
          //     }
          //   } else {
          dispatch({ type: "ADD_CHAIR", payload: no });
          //   }
        }
      }}
      className={`flex h-12 w-12 items-center justify-center rounded-full  font-semibold ${
        isUsed
          ? "bg-red-500 text-white"
          : isSelected
          ? `bg-orange-500 text-main-white hover:bg-orange-400 peer-hover:bg-orange-400 ${
              hovering && "bg-orange-400"
            }`
          : `bg-gray-map text-main-black hover:bg-gray-hover peer-hover:bg-gray-hover ${
              hovering && "bg-gray-hover"
            }`
      }`}
    >
      {no}
    </button>
  );
}

function MejaPanjang({ top }) {
  return (
    <div
      className={`h-12 w-full ${
        top ? "rounded-b-xl" : "rounded-t-xl"
      } bg-gray-map`}
    ></div>
  );
}

function MejaKotak({ no, setHovering, kursiHovering }) {
  const { dispatch, state } = useContext(KursiContext);
  const { hour, minute, bookingEndTime, bookingEndMinute } = state;
  //   const isSelected =
  //     (state.selectedChair.includes(no) || state.usedChair.includes(no)) &&
  //     (state.selectedChair.includes(no + 1) ||
  //       state.usedChair.includes(no + 1)) &&
  //     (state.selectedChair.includes(no + 2) ||
  //       state.usedChair.includes(no + 2)) &&
  //     (state.selectedChair.includes(no + 3) || state.usedChair.includes(no + 3));
  const filter = (number) =>
    state.usedChair.filter((i) => i.chairs.includes(number));

  const isSelected =
    state.selectedChair.includes(no) ||
    state.selectedChair.includes(no + 1) ||
    state.selectedChair.includes(no + 2) ||
    state.selectedChair.includes(no + 3);

  const isFull =
    filter(no).length > 0 &&
    filter(no + 1).length > 0 &&
    filter(no + 2).length > 0 &&
    filter(no + 3).length > 0 &&
    (timeBetween(
      filter(no)[0]?.start.hour,
      filter(no)[0]?.start.minute,
      filter(no)[0]?.end.hour,
      filter(no)[0]?.end.minute,
      hour,
      minute
    ) ||
      timeBetween(
        filter(no)[0]?.start.hour,
        filter(no)[0]?.start.minute,
        filter(no)[0]?.end.hour,
        filter(no)[0]?.end.minute,
        bookingEndTime,
        bookingEndMinute,
        true
      ) ||
      timeBetween(
        hour,
        minute,
        bookingEndTime,
        bookingEndMinute,
        filter(no)[0]?.end.hour,
        filter(no)[0]?.end.minute,
        true
      ) ||
      timeBetween(
        hour,
        minute,
        bookingEndTime,
        bookingEndMinute,
        filter(no)[0]?.start.hour,
        filter(no)[0]?.start.minute
      ));

  const filterWithTime = (number) => {
    const data = filter(number);
    if (data.length > 0) {
      const res = data.filter(
        (i) =>
          timeBetween(
            data[i]?.start.hour,
            data[i]?.start.minute,
            data[i]?.end.hour,
            data[i]?.end.minute,
            hour,
            minute
          ) ||
          timeBetween(
            data[i]?.start.hour,
            data[i]?.start.minute,
            data[i]?.end.hour,
            data[i]?.end.minute,
            bookingEndTime,
            bookingEndMinute,
            true
          ) ||
          timeBetween(
            hour,
            minute,
            bookingEndTime,
            bookingEndMinute,
            data[i]?.end.hour,
            data[i]?.end.minute,
            true
          ) ||
          timeBetween(
            hour,
            minute,
            bookingEndTime,
            bookingEndMinute,
            data[i]?.start.hour,
            data[i]?.start.minute
          )
      );
      if (res.length > 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <button
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      disabled={isFull}
      onClick={() => {
        const start = no - (no % 4);

        if (isSelected) {
          for (let i = start; i < start + 4; i++) {
            if (state.selectedChair.includes(i)) {
              dispatch({ type: "REMOVE_CHAIR", payload: i });
            }
          }
        } else {
          for (let i = start; i < start + 4; i++) {
            if (!filterWithTime(i) && !state.usedChair.includes(i)) {
              dispatch({ type: "ADD_CHAIR", payload: i });
            }
          }
        }
      }}
      className={`peer h-14 w-32 rounded-xl ${
        isFull
          ? "bg-red-500"
          : isSelected
          ? `bg-orange-500 hover:bg-orange-400 ${
              kursiHovering && "bg-orange-400"
            }`
          : `bg-gray-map hover:bg-gray-hover ${
              kursiHovering && "bg-gray-hover"
            }`
      }`}
    ></button>
  );
}

function MejaPaketKecil({ start }) {
  const [hovering, setHovering] = useState(false);
  const [kursiHovering, setkursiHovering] = useState(false);

  return (
    <div className="group flex flex-col items-center space-y-3">
      {/* Kursi */}
      <div className="flex items-center justify-between space-x-7">
        {[...Array(2)].map((_, i) => (
          <Kursi
            key={i + start}
            no={i + start}
            paket={true}
            hovering={hovering}
            setkursiHovering={setkursiHovering}
          />
        ))}
      </div>
      {/* Meja */}
      <MejaKotak
        no={start}
        setHovering={setHovering}
        kursiHovering={kursiHovering}
      />
      {/* Kursi */}
      <div className="flex items-center justify-between space-x-7">
        {[...Array(2)].map((_, i) => (
          <Kursi
            key={i + start + 2}
            no={i + start + 2}
            paket={true}
            hovering={hovering}
            setkursiHovering={setkursiHovering}
          />
        ))}
      </div>
    </div>
  );
}

function RowMeja({ start }) {
  return (
    <div className="flex w-full justify-between">
      {[...Array(4)].map((_, i) => {
        const startReal = start + i * 4;

        return <MejaPaketKecil key={startReal} start={startReal} />;
      })}
    </div>
  );
}

function MejaPaketPanjang({ top, start }) {
  return (
    <div className={`flex w-full flex-col space-y-2`}>
      {/* Kursi */}
      {top ? (
        <>
          <MejaPanjang top={top} />
          <div className="flex items-center justify-evenly">
            {[...Array(7)].map((_, i) => (
              <Kursi key={i + start} no={i + start} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-evenly">
            {[...Array(7)].map((_, i) => (
              <Kursi key={i + start} no={i + start} />
            ))}
          </div>
          <MejaPanjang top={top} />
        </>
      )}
    </div>
  );
}
