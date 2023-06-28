import Image from "next/image";
import Name from "./Name";
import Time from "./Time";
import ListBorder from "./ListBorder";
import { useContext, useEffect, useState } from "react";
import { KursiContext } from "../../../../context/pesankursi/kursiContext";
import Plus from "../../../../public/assets/plus-solid.svg";
import Minus from "../../../../public/assets/minus-solid.svg";
import db from "../../../../database.json";
import {
  formatJam,
  timeBetween,
  timeDifferent,
} from "../../../../utils/formater";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Waitlist() {
  const [reservation, setReservation] = useState(true);

  return (
    <div className="h-[47rem] overflow-hidden">
      <div className="mr-10 h-full rounded-t-3xl bg-orange-500 py-3 px-10 shadow-[30px_30px_0px_0px_rgba(179,80,5,1)]">
        <div className="mt-10 flex items-center justify-between pb-8">
          <button
            onClick={() => setReservation(true)}
            className={`rounded-xl border-2  px-4 py-2 text-xl font-semibold ${
              reservation ? "border-main-white text-white" : "border-main-black"
            }`}
          >
            Reservation
          </button>
          <button
            onClick={() => setReservation(false)}
            className={`rounded-xl border-2 px-4 py-2 text-xl font-semibold ${
              reservation ? "border-main-black" : "border-main-white text-white"
            }`}
          >
            Waiting List
          </button>
        </div>
        {reservation ? <Reservation /> : <WaitingList />}
      </div>
    </div>
  );
}

function Reservation() {
  const { state } = useContext(KursiContext);
  const router = useRouter();

  return (
    <>
      <h1 className="w-full pb-10 text-center text-xl font-bold">
        Kursi yang dipilih
      </h1>
      <div className="flex w-full flex-col">
        <div className="mb-8 flex items-center justify-evenly">
          <div className="flex flex-col items-center justify-center font-semibold">
            <p>Start</p>
            <BookingTime
            // hour={hour}
            // minute={minute}
            // setHour={setHour}
            // setMinute={setMinute}
            // hourNow={hourNow}
            />
          </div>
          <div className="flex flex-col items-center justify-center font-semibold">
            <p>End</p>
            <BookingTime
              end={true}
              // hour={hour}
              // minute={minute}
              // setHour={setHour}
              // setMinute={setMinute}
            />
          </div>
        </div>
        {state.selectedChair.length > 0 && <SelectedChair />}
        {timeDifferent(
          state.hour,
          state.minute,
          state.hourNow,
          new Date().getMinutes(),
          60
        ) && (
          <h1 className="font-semibold text-black">
            *Booking untuk 1 Jam dari sekarang tidak bisa menggunakan Cash
          </h1>
        )}
        {state.selectedChair.length > 0 && (
          <button
            onClick={() => router.push("/method")}
            className="ml-auto rounded-xl border-2 border-white py-2 px-4 font-semibold text-white"
          >
            Next Step
          </button>
        )}
      </div>
    </>
  );
}

function SelectedChair() {
  const { state, dispatch } = useContext(KursiContext);
  const { hour, minute, bookingEndTime, bookingEndMinute } = state;

  // const hourNow = new Date().getHours();
  // const minuteNow = new Date().getMinutes();
  // const [hour, setHour] = useState(hourNow);
  // const [minute, setMinute] = useState(minuteNow < 30 ? 0 : 30);

  const filter = (number) =>
    state.usedChair.filter((i) => i.chairs.includes(number));

  const filterWithTime = (number) => {
    const data = filter(number);
    if (data.length > 0) {
      const res = data.filter((i) => {
        return (
          timeBetween(
            i.start.hour,
            i.start.minute,
            i.end.hour,
            i.end.minute,
            hour,
            minute
          ) ||
          timeBetween(
            i.start.hour,
            i.start.minute,
            i.end.hour,
            i.end.minute,
            bookingEndTime,
            bookingEndMinute,
            true
          ) ||
          timeBetween(
            hour,
            minute,
            bookingEndTime,
            bookingEndMinute,
            i.end.hour,
            i.end.minute,
            true
          ) ||
          timeBetween(
            hour,
            minute,
            bookingEndTime,
            bookingEndMinute,
            i.start.hour,
            i.start.minute
          )
        );
      });

      if (res.length > 0) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    state.selectedChair.forEach((i) => {
      if (filterWithTime(i)) {
        dispatch({ type: "REMOVE_CHAIR", payload: i });
      }
    });
  }, [state]);

  return (
    <div className="mb-5 flex w-full items-center justify-center">
      <div className="flex w-full flex-wrap justify-start gap-3">
        {state.selectedChair.map((x) => (
          <ChairCircle key={x}>{x}</ChairCircle>
        ))}
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

function BookingTime({ end }) {
  // const [bookingEndTime, setBookingEndTime] = useState(
  //   minute < 30 ? hour : hour + 1
  // );
  // const [bookingEndMinute, setBookingEndMinute] = useState(
  //   minute < 30 ? 30 : 0
  // );

  // useEffect(() => {
  //   if (bookingEndTime == hour && minute == 0) {
  //     setBookingEndTime(() => hour);
  //     setBookingEndMinute(() => 30);
  //   } else if (bookingEndTime == hour) {
  //     setBookingEndTime(() => hour + 1);
  //     setBookingEndMinute(() => 0);
  //   }
  // }, [hour, minute, bookingEndTime]);

  const { state, dispatch } = useContext(KursiContext);
  const { hour, minute, hourNow, bookingEndMinute, bookingEndTime } = state;

  function setBookingEndTime(x) {
    dispatch({
      type: "SET_BOOKING_END_TIME",
      payload: x,
    });
  }

  function setBookingEndMinute(x) {
    dispatch({
      type: "SET_BOOKING_END_MINUTE",
      payload: x,
    });
  }

  function setHour(x) {
    dispatch({
      type: "SET_HOUR",
      payload: x,
    });
  }

  function setMinute(x) {
    dispatch({
      type: "SET_MINUTE",
      payload: x,
    });
  }

  useEffect(() => {
    if (bookingEndTime == hour && minute == 0 && bookingEndMinute == 0) {
      setBookingEndTime(hour);
      setBookingEndMinute(29);
    } else if (
      bookingEndTime == hour &&
      minute == 30 &&
      bookingEndMinute == 29
    ) {
      setBookingEndTime(hour + 1);
      setBookingEndMinute(0);
    }
  }, [hour, minute, bookingEndMinute, bookingEndTime]);

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
      !end &&
      ((hour >= hourNow && minute == 30) ||
        (hour > hourNow && minute == 0 && hour <= 22))
    ) {
      if (minute === 0) {
        setMinute(30);
        // setHour((x) => x - 1);
        setHour(hour - 1);
      } else {
        setMinute(0);
      }
    } else if (end) {
      if (
        bookingEndTime > hour &&
        bookingEndMinute === 0 &&
        !(hour + 1 == bookingEndTime && bookingEndMinute == 0 && minute == 30)
      ) {
        setBookingEndMinute(29);
        // setBookingEndTime((x) => x - 1);
        setBookingEndTime(bookingEndTime - 1);
      } else if (bookingEndTime > hour && bookingEndMinute === 29) {
        setBookingEndMinute(0);
      }
    }
  };

  const handlePlus = () => {
    if (
      !end &&
      ((hour >= hourNow && minute == 30 && hour < 21) ||
        (hour >= hourNow && minute == 0 && hour <= 21))
    ) {
      if (minute === 0) {
        setMinute(30);
      } else {
        setMinute(0);
        // setHour((x) => x + 1);
        setHour(hour + 1);
      }
    } else if (
      end &&
      ((bookingEndTime <= 21 && bookingEndMinute == 29) ||
        (bookingEndTime < 22 && bookingEndMinute == 0))
    ) {
      if (bookingEndMinute === 0) {
        setBookingEndMinute(29);
      } else if (bookingEndMinute === 29) {
        // setBookingEndTime((x) => x + 1);
        setBookingEndTime(bookingEndTime + 1);
        setBookingEndMinute(0);
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

function WaitingList() {
  // sum chair selected
  let data = 0;

  useState(() => {
    db.waitinglist.map(({ chairs }) => (data += chairs.length));
  }, []);

  return (
    <>
      <h1 className="mt-3 mb-1 w-4/12 font-poppins text-3xl font-bold">
        Waitinglist
      </h1>

      <div className="flex w-6/12">
        <div className="mt-1 mr-1">
          <Image
            width={25}
            height={25}
            src="/UserGroups.svg"
            alt="User Group Count"
          />
        </div>
        <div className="mx-[1px] text-xl font-bold">
          {db.waitinglist.length}
        </div>

        <div className="ml-2 mt-1">
          <Image width={20} height={20} src="/User.svg" alt="User Count" />
        </div>
        <div className="mx-[1px] text-xl font-bold">{data}</div>
      </div>

      {/* List */}
      {db.waitinglist.map(({ id, name, chairs, start, end }) => (
        <div key={id} className="flex-cols my-5 flex">
          <ListBorder>
            <Name>{name}</Name>
            <div className="my-[2px] flex w-3/12 flex-wrap justify-end gap-1">
              {chairs.map((x) => (
                <ChairCircle key={x}>{x}</ChairCircle>
              ))}
            </div>
            <Time>
              {formatJam(start.hour)}.{formatJam(start.minute)} -{" "}
              {formatJam(end.hour)}:{formatJam(end.minute)}
            </Time>
          </ListBorder>
        </div>
      ))}
    </>
  );
}
