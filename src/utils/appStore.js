import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import videoSlice from "./videoSlice";
import chatSlice from "./chatSlice";

const appStore = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    video: videoSlice,
    chat: chatSlice,
  },
});

export default appStore;
