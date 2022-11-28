import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import albumTitleReducer from "./reducers";

const rootReducer = combineReducers({ albumTitleReducer });

export const STORE = createStore(rootReducer, applyMiddleware(thunk));
