import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import promise from "./promise";
import reducers from "../reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store = createStore(
  reducers,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk, promise, logger)
  )
);
export default store;
