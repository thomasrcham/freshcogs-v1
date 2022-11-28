import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./AlbumSlice";

export const store = configureStore({
  reducer: {
    albums: albumReducer,
  },
});
