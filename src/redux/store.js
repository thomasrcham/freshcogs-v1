import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import albumReducer from "./reducers";

const rootReducer = combineReducers({ albumReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
