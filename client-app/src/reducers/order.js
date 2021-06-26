import {
  ORDERS_DATA_SHOULD_FETCH,
  REICEVE_ALL_ORDER,
  REICEVE_ORDER_BY_ID_CUS,
  REICEVE_ORDER_BY_ID_ORD,
} from "../actions/types";

const initialState = {
  orders: [],
  currentProds: [],
  allOrders: [],
  shouldFetchdata: false,
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case REICEVE_ORDER_BY_ID_CUS:
      return {
        ...state,
        orders: action.orders,
        shouldFetchdata: false,
      };
    case REICEVE_ORDER_BY_ID_ORD:
      return {
        ...state,
        currentProds: action.idOrd,
      };
    case REICEVE_ALL_ORDER:
      return {
        ...state,
        allOrders: action.orders,
      };
    case ORDERS_DATA_SHOULD_FETCH:
      return {
        ...state,
        shouldFetchdata: true,
      };
    default:
      return state;
  }
};

export default orders;
