import * as types from "./types";

export const addToCart = (product) => ({
    type: types.STORE_IN_CART,
    cart: product,
  });
  