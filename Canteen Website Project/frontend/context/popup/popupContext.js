import { useReducer, createContext } from "react";

const initialState = false;

const PopupContext = createContext();

function popupReducer(state, action) {
  switch (action.type) {
    case "CLICK":
      return !state;
    default:
      return state;
  }
}

function PopupProvider({ children }) {
  const [state, dispatch] = useReducer(popupReducer, initialState);

  return (
    <PopupContext.Provider value={{ state, dispatch }}>
      {children}
    </PopupContext.Provider>
  );
}

export { PopupContext, PopupProvider };
