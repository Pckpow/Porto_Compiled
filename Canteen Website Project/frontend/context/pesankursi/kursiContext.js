import { useReducer, createContext } from "react";
import db from "../../database.json";

let initialState = {
  selectedChair: [],
  usedChair: db.waitinglist,
  hourNow: new Date().getHours(),
  hour: new Date().getHours(),
  minute: new Date().getMinutes() < 30 ? 0 : 30,
  bookingEndTime:
    new Date().getMinutes() < 30
      ? new Date().getHours()
      : new Date().getHours() + 1,
  bookingEndMinute: new Date().getMinutes() < 30 ? 29 : 0,
};

const KursiContext = createContext();

function setHour(state, payload) {
  return {
    ...state,
    hour: payload,
  };
}

function setMinute(state, payload) {
  return {
    ...state,
    minute: payload,
  };
}

function setBookingEndTime(state, payload) {
  return {
    ...state,
    bookingEndTime: payload,
  };
}

function setBookingEndMinute(state, payload) {
  return {
    ...state,
    bookingEndMinute: payload,
  };
}

function addChair(state, payload) {
  const updatedChair = [...state.selectedChair];
  updatedChair.push(payload);

  return {
    ...state,
    selectedChair: updatedChair,
  };
}

function removeChair(state, payload) {
  const updatedChair = [...state.selectedChair];
  const updatedItemIndex = updatedChair.findIndex((item) => item == payload);

  updatedChair.splice(updatedItemIndex, 1);

  return {
    ...state,
    selectedChair: updatedChair,
  };
}

function kursiReducer(state, action) {
  switch (action.type) {
    case "ADD_CHAIR":
      return addChair(state, action.payload);
    case "REMOVE_CHAIR":
      return removeChair(state, action.payload);
    case "SET_HOUR":
      return setHour(state, action.payload);
    case "SET_MINUTE":
      return setMinute(state, action.payload);
    case "SET_BOOKING_END_TIME":
      return setBookingEndTime(state, action.payload);
    case "SET_BOOKING_END_MINUTE":
      return setBookingEndMinute(state, action.payload);
    default:
      return state;
  }
}

function KursiProvider({ children }) {
  const [state, dispatch] = useReducer(kursiReducer, initialState);

  return (
    <KursiContext.Provider value={{ state, dispatch }}>
      {children}
    </KursiContext.Provider>
  );
}

export { KursiContext, KursiProvider };
