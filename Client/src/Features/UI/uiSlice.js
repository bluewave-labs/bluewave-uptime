import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  table: {
    rowsPerPage: 5,
  },
  sidebar: {
    collapsed: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRowsPerPage: (state, action) => {},
    setCollapsed: (state, action) => {},
  },
});

export default uiSlice.reducer;
export const { setRowsPerPage, setCollapsed } = uiSlice.actions;
