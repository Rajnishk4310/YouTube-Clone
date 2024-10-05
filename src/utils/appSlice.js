import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    toggleSideContainerState: true,
  },
  reducers: {
    toggleSideContainer: (state) => {
      state.toggleSideContainerState = !state.toggleSideContainerState;
    },
    changeToggleSideContainerState: (state, action) => {
      state.toggleSideContainerState = action.payload;
    },
  },
});

export const { changeToggleSideContainerState, toggleSideContainer } = appSlice.actions;
export default appSlice.reducer;
