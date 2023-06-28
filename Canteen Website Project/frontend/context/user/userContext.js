import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user: {},
  isLogin: false,
};

const UserContext = createContext();

function userLogin(state, payload) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "isLogin",
      JSON.stringify({ isLogin: true, user: payload })
    );
  }

  return {
    ...state,
    user: payload,
    isLogin: true,
  };
}

function userLogout(state) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isLogin");
  }

  return {
    ...state,
    user: {},
    isLogin: false,
  };
}

function userReducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      return userLogin(state, action.payload);
    case "SIGN_OUT":
      return userLogout(state);
    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("isLogin");
      if (data) {
        const { isLogin, user } = JSON.parse(data);
        if (isLogin) {
          dispatch({ type: "SIGN_IN", payload: user });
        }
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
