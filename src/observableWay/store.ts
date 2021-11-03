import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import { createSlice } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    modal: modalReducer,
    currentAction: (state, action) => action?.type,
  },
});
