import {
  RECEIVE_PRODUCT,
  PRODUCTS_DATA_SHOULD_FETCH,
  CURRENT_PRODUCT_UPDATE,
} from "../actions/types";

const initialState = {
  products: [],
  isFetching: true,
  shouldFetchdata: false,
  productsInCart: [],
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
    default:
      return state;
  }
};

export default products;
