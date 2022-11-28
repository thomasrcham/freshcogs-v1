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
  },
});

export const { addAlbum } = albumSlice.actions;
export default albumSlice.reducer;
