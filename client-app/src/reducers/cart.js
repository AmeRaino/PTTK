// import {
//   ADJUST_QTY_CART,
//   REMOVE_FROM_CART,
//   STORE_IN_CART,
// } from "../actions/types";

// const initialState = {
//   cart: [],
//   currentItem: null,
// };

// const cart = (state = initialState, action) => {
//   switch (action.type) {
//     case STORE_IN_CART:
//       const item = store.products.products.find(
//         (prod) => prod.id === action.payload.id
//       );
//       const inCart = .cart.find((item) =>
//         item.id === action.payload.id ? true : false
//       );
//       return {
//         ...state,
//         cart: inCart
//           ? store.cart.cart.map((item) =>
//               item.id === action.payload.id
//                 ? { ...item, qty: item.qty + 1 }
//                 : item
//             )
//           : [...state.cart, { ...item, qty: 1 }],
//       };
//     case REMOVE_FROM_CART:
//       return {
//         ...state,
//         cart: store.cart.cart.filter((item) => item.id !== action.payload.id),
//       };
//     case ADJUST_QTY_CART:
//       return {
//         ...state,
//         cart: store.cart.cart.map(
//           (item) =>
//             (item.id = action.payload.id
//               ? { ...item, qty: action.payload.qty }
//               : item)
//         ),
//       };
//     default:
//       return state;
//   }
// };

// export default cart;
