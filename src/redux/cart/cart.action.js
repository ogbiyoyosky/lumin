import { cartType } from "./cart.type";

export const setCartState = (isHidden) => ({
  type: cartType.CHANGE_CART_STATE,
  payload: isHidden,
});

export const setCart = (cart) => {
  return {
    type: cartType.SET_CART,
    payload: cart,
  };
};

export const changeCurrency = (currency) => ({
  type: "CHANGE_CURRENCY",
  payload: currency,
});

export const setProducts = (products) => ({
  type: "SET_PRODUCTS",
  payload: products,
});
