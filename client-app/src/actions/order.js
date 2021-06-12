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
