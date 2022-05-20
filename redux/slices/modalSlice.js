import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
  component: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      console.log(action.payload);
      state.visibility = !state.visibility;
    },
  },
});

export const { setVisible } = modalSlice.actions;
export default modalSlice.reducer;
