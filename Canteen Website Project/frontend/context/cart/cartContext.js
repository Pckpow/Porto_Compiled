import { useReducer, createContext, useEffect, useContext } from "react";
import { UserContext } from "../user/userContext";

let initialState = {
  cart: [],
};

const CartContext = createContext();

function loadFromDB(state, payload) {
  const cart = payload;
  return {
    ...state,
    cart: cart,
  };
}

function addToCart(state, payload) {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.name === payload.name
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...payload, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  localStorage.setItem("cart", JSON.stringify({ ...state, cart: updatedCart }));
  return {
    ...state,
    cart: updatedCart,
  };
}

function removeFromCart(state, payload) {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.name === payload.name
  );

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  localStorage.setItem("cart", JSON.stringify({ ...state, cart: updatedCart }));

  return { ...state, cart: updatedCart };
}

function userLogout(state) {
  return { ...state, cart: [] };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return addToCart(state, action.payload);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, action.payload);
    case "LOAD_FROM_DB":
      return loadFromDB(state, action.payload);
    case "USER_LOGOUT":
      return userLogout(state);
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { state: userState } = useContext(UserContext);

  useEffect(() => {
    if (typeof window !== "undefined" && userState.isLogin) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        dispatch({ type: "LOAD_FROM_DB", payload: cart.cart });
      }
    } else {
      dispatch({ type: "USER_LOGOUT" });
    }
  }, [userState]);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
