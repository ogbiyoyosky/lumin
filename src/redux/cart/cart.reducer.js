import { cartType } from "./cart.type";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  carts: [],
  products: [],
  currency: "NGN",
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartType.CHANGE_CART_STATE:
      return {
        ...state,
        hidden: action.payload,
      };
    case cartType.SET_CART:
      return {
        ...state,
        carts: addItemToCart(state.carts, action.payload),
      };
    case "CHANGE_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
