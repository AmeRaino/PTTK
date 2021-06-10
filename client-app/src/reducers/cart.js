import { STORE_IN_CART } from "../actions/types";

const initialState = {
    cart: [],
    currentItem: null,
  };

  const cart = (state = initialState, action) => {
    switch (action.type) {
      case STORE_IN_CART:
        return {
          ...state,
          products: [...state, action.products],
        };
      default:
        return state;
    }
  };
  
  export default cart;