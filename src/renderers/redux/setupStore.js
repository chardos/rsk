module.exports = (name, actions) => `
  import { createStore, compose, combineReducers } from "redux";
  import reducers from "./ducks";

  const rootReducer = combineReducers(reducers);

  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  export default store;
`;
