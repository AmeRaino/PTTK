import * as types from "./types";
import product from "../api/product";

const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCT,
  products,
});


export const getAllProducts = () => (dispatch) => {
    product.getProducts().then((response) => {
      dispatch(receiveProducts(response.data));
    });
  };

  // export const getProductById = (id) => (dispatch) => {
  //   product.getProductById(id).then((response) => {
  //     dispatch(receiveProducts(response.data));
  //   });
  // };


  export const setShouldFetchData = (should) => (dispatch) => {
    dispatch({
      type: types.PRODUCTS_DATA_SHOULD_FETCH,
    });
  };
  

  export const updateCurrentProduct = (id, data) => (dispatch) => {
    product.updateProduct(id, data).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: types.CURRENT_PRODUCT_UPDATE,
          currentUser: response.data,
        });
      }
    });
  };

  export const getProductCategories = async () => {
    product.getProductCategories().then((response) => {
      console.log(response);
      return response;
    });
  };

  export const addProduct = (data) => {
    product.insert(data).then((response) => {
      return response;
    });
  };


  export const addToCart = (itemID, value) => ({
    type: types.STORE_IN_CART,
    payload: {
      id: itemID,
      qty: value,
    },
  });
  
  export const removeFromCart = (itemID) => ({
    type: types.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  });
  
  export const adjustQTYCart = (itemID, value) => ({
    type: types.REMOVE_FROM_CART,
    payload: {
      id: itemID,
      qty: value,
    },
  });
  