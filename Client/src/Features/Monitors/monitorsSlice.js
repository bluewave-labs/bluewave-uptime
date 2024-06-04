import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  monitors: [],
  success: null,
  msg: null,
};

const monitorsSlice = createSlice({
  name: "monitors",
  initialState,
  reducers: {
    setMonitors: (state, action) => {
      state.monitors = action.payload;
    },
  },
});

export const { setMonitors } = monitorsSlice.actions;

export default monitorsSlice.reducer;
