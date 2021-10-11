import { createSlice } from "@reduxjs/toolkit";

enum ModalState {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    value: ModalState.CLOSED,
  },
  reducers: {
    open: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = ModalState.OPEN;
    },
    close: (state) => {
      state.value = ModalState.CLOSED;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
