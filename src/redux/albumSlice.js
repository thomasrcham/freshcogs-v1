import { createSlice, current } from "@reduxjs/toolkit";

export const albumSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
  },

  reducers: {
    addAlbum: (state, action) => {
      state.albums.push(action.payload);
      // console.log(action.payload);
      // console.log(current(state.albums));
    },
    callAlbum: (state, action) => {
      state.albums.find((a) => a.id === action.payload);
    },
  },
});

export const { addAlbum, callAlbum } = albumSlice.actions;
export default albumSlice.reducer;
