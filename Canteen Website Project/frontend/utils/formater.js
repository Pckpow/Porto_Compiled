export function formatRupiah(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatJam(x) {
  return x < 10 ? `0${x}` : x;
}

function setDateTime(date, str) {
  var sp = str.split(":");
  date.setHours(parseInt(sp[0], 10));
  date.setMinutes(parseInt(sp[1], 10));
  date.setSeconds(parseInt(sp[2], 10));
  return date;
}

export function timeDifferent(
  hourFirst,
  minuteFirst,
  hourSecond,
  minuteSecond,
  different
) {
  const current = new Date();

  const first = setDateTime(
    new Date(current),
    `${hourFirst}:${minuteFirst}:00`
  );
  const second = setDateTime(
    new Date(current),
    `${hourSecond}:${minuteSecond}:00`
  );
  const diff = Math.abs(second - first) / 1000;
  return diff / 60 >= different;
}

export function timeBetween(
  hourStart,
  minuteStart,
  hourEnd,
  minuteEnd,
  hourNow,
  minuteNow,
  endTime = false
) {
  const current = new Date();

  const c = setDateTime(
    new Date(current),
    `${formatJam(hourNow)}:${formatJam(minuteNow)}:00`
  );

  const start = setDateTime(
    new Date(current),
    `${formatJam(hourStart)}:${formatJam(minuteStart)}:00`
  );

  const end = setDateTime(
    new Date(current),
    `${formatJam(hourEnd)}:${formatJam(minuteEnd)}:00`
  );

  if (endTime) {
    return c.getTime() > start.getTime() && c.getTime() <= end.getTime();
  }
  return c.getTime() >= start.getTime() && c.getTime() < end.getTime();
}
