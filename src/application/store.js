import rootReducer from "./reducers/rootReducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";

// //console.log(typeof window)

// export const store = createStore(
//   rootReducer,
//   {},
//   composeWithDevTools(
//     applyMiddleware(thunk),
//   )
// );
// export default store;

export const makeStore = () =>
  createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore);
