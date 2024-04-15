import sessionReducer from "./session";
import reviewReducer from "./reviews";
import spotReducer from "./spots";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotReducer,
  reviews: reviewReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
