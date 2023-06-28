import Plus from "../../../public/assets/plus-solid.svg";
import Minus from "../../../public/assets/minus-solid.svg";
import { useContext, useEffect, useState } from "react";
import { KursiContext } from "../../../context/pesankursi/kursiContext";

export default function CardWaitingList() {
  const { state } = useContext(KursiContext);
  return (
    <div className="mr-12 flex h-[41.5rem] flex-col items-start justify-start rounded-xl bg-[#FFAD4D] p-8">
      <h1 className="w-full pb-10 text-center text-xl font-bold">
        Kursi yang dipilih
      </h1>
      <div className="flex w-full flex-col">
        {state.selectedChair.length > 0 && (
          <SelectedChair selectedChair={state.selectedChair} />
        )}
      </div>
    </div>
  );
}

function SelectedChair({ selectedChair }) {
  const hourNow = new Date().getHours();
  const minuteNow = new Date().getMinutes();
  const [hour, setHour] = useState(hourNow);
  const [minute, setMinute] = useState(minuteNow < 30 ? 0 : 30);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex max-w-[7rem] flex-wrap justify-evenly gap-1">
        {selectedChair.map((x) => (
          <ChairCircle key={x}>{x}</ChairCircle>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center font-semibold">
        <p>Start</p>
        <BookingTime
          hour={hour}
          minute={minute}
          setHour={setHour}
          setMinute={setMinute}
          hourNow={hourNow}
        />
      </div>
      <div className="flex flex-col items-center justify-center font-semibold">
        <p>End</p>
        <BookingTime
          end={true}
          hour={hour}
          minute={minute}
          setHour={setHour}
          setMinute={setMinute}
        />
      </div>
    </div>
  );
}

function ChairCircle({ children }) {
  return (
    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-main-black p-3 text-xs text-main-white">
      {children}
    </div>
  );
}

function BookingTime({ hour, minute, setHour, setMinute, hourNow, end }) {
  const [bookingEndTime, setBookingEndTime] = useState(
    minute < 30 ? hour : hour + 1
  );
  const [bookingEndMinute, setBookingEndMinute] = useState(
    minute < 30 ? 29 : 0
  );

  useEffect(() => {
    if (bookingEndTime == hour && minute == 0) {
      setBookingEndTime(() => hour);
      setBookingEndMinute(() => 29);
    } else if (bookingEndTime == hour) {
      setBookingEndTime(() => hour + 1);
      setBookingEndMinute(() => 0);
    }
  }, [hour, minute, bookingEndTime]);

  const formatHour = (hour) => {
    if (hour < 10) return `0${hour}`;
    return hour;
  };

  const formatMinute = (minute) => {
    if (minute < 10) return `0${minute}`;
    return minute;
  };

  const time = end
    ? `${formatHour(bookingEndTime)}.${formatMinute(bookingEndMinute)}`
    : `${formatHour(hour)}.${formatMinute(minute)}`;

  const handleMinus = () => {
    if (
      (hour >= hourNow && minute == 30) ||
      (hour > hourNow && minute == 0 && hour <= 22)
    ) {
      if (minute === 0) {
        setMinute(() => 30);
        setHour((x) => x - 1);
      } else {
        setMinute(() => 0);
      }
      //   else if end and when bookingendtime higher than hour
    } else if (end) {
      if (
        bookingEndTime > hour &&
        bookingEndMinute === 0 &&
        !(hour + 1 == bookingEndTime && bookingEndMinute == 0 && minute == 30)
      ) {
        setBookingEndMinute(() => 30);
        setBookingEndTime((x) => x - 1);
      } else if (bookingEndTime > hour && bookingEndMinute === 29) {
        setBookingEndMinute(() => 0);
      }
    }
  };

  const handlePlus = () => {
    if (
      (hour >= hourNow && minute == 30 && hour < 21) ||
      (hour >= hourNow && minute == 0 && hour <= 21)
    ) {
      if (minute === 0) {
        setMinute(() => 30);
      } else {
        setMinute(() => 0);
        setHour((x) => x + 1);
      }
    } else if (
      end &&
      ((bookingEndTime <= 21 && bookingEndMinute == 29) ||
        (bookingEndTime < 22 && bookingEndMinute == 0))
    ) {
      if (bookingEndMinute === 0) {
        setBookingEndMinute(() => 29);
      } else if (bookingEndMinute === 29) {
        setBookingEndTime((x) => x + 1);
        setBookingEndMinute(() => 0);
      }
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button onClick={() => handleMinus()}>
        <Minus className="h-4 w-4" />
      </button>
      <p className="font-semibold">{time}</p>
      <button onClick={() => handlePlus()}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
