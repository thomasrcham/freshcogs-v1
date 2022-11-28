import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./albumSlice";

export const store = configureStore({
  reducer: {
    albums: albumReducer,
  },
});
