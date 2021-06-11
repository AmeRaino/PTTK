import {
  RECEIVE_PRODUCT,
  PRODUCTS_DATA_SHOULD_FETCH,
  CURRENT_PRODUCT_UPDATE,
  ADJUST_QTY_CART,
  REMOVE_FROM_CART,
  STORE_IN_CART,
} from "../actions/types";

const initialState = {
  products: [],
  isFetching: true,
  shouldFetchdata: false,
  cart: [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCT:
      return {
        ...state,
        products: action.products,
        isFetching: false,
        shouldFetchdata: false,
      };
    case CURRENT_PRODUCT_UPDATE:
      return {
        ...state,
        currentProduct: action.currentProduct,
      };
    case PRODUCTS_DATA_SHOULD_FETCH:
      return {
        ...state,
        shouldFetchdata: true,
      };
    case STORE_IN_CART:
      const item = state.products.find((prod) => prod.id === action.payload.id);
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case ADJUST_QTY_CART:
      return {
        ...state,
        cart: state.cart.map(
          (item) =>
            (item.id = action.payload.id
              ? { ...item, qty: action.payload.qty }
              : item)
        ),
      };
    default:
      return state;
  }
};

export default products;
