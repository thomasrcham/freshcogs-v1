import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import wordsReducer from "./reducers";

const rootReducer = combineReducers({ wordsReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
