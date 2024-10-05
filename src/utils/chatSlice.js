import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatMessage: [],
  },
  reducers: {
    addChatMessage: (state, action) => {
      state.chatMessage = action.payload;
    },
  },
});

export const { addChatMessage } = chatSlice.actions;

export default chatSlice.reducer;
