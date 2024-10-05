import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "popular",
  initialState: {
    popularVideo: {},
    searchVideo: {},
  },
  reducers: {
    addPopularVideo: (state, action) => {
      state.popularVideo = action.payload;
    },
    addSearchVideo: (state, action) => {
      state.searchVideo = action.payload;
    },
  },
});
export const { addPopularVideo, addSearchVideo } = videoSlice.actions;

export default videoSlice.reducer;
