import * as types from "./types";
import order from "../api/order";

const receiveOrderByIdCus = (orders) => ({
  type: types.REICEVE_ORDER_BY_ID_CUS,
  orders,
});

export const getOrderByIdCus = (id) => (dispatch) => {
  order.getOrderByIdCus(id).then((response) => {
    dispatch(receiveOrderByIdCus(response.data));
  });
};

export const createOrder = (data) => {
  order.insert(data).then((response) => {
    return response;
  });
};

export const setShouldFetchData = (should) => (dispatch) => {
  dispatch({
    type: types.ORDERS_DATA_SHOULD_FETCH,
  });
};

const receiveAllProInOrdDetail = (idOrd) => ({
  type: types.REICEVE_ORDER_BY_ID_ORD,
  idOrd,
});


export const getAllProdInOrdDetail = (id) => (dispatch) => {
  order.getAllProdInOrdDetail(id).then((response) => {
    dispatch(receiveAllProInOrdDetail(response.data));
  });
};


const receiveAllOrder = (orders) => ({
  type: types.REICEVE_ALL_ORDER,
  orders,
});


export const getAllOrder = () => (dispatch) => {
  order.getAllOrder().then((response) => {
    dispatch(receiveAllOrder(response.data));
  });
};

