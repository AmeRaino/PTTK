import { REICEVE_ORDER_BY_ID_CUS } from "../actions/types";

const initialState = {
    orders: [],
};


const orders = (state = initialState, action) => {
    switch (action.type) {
      case REICEVE_ORDER_BY_ID_CUS:
        return {
          ...state,
          orders: action.orders,
        };
      default:
        return state;
    }
  };
  
  export default orders;