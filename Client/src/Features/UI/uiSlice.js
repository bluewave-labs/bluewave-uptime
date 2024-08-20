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
    setTablePreferences: (state, action) => {
      state.table = { ...action };
    },
    toggleSidebar: (state) => {
      state.sidebar.collapsed = !state.sidebar.collapsed;
    },
  },
});

export default uiSlice.reducer;
export const { setTablePreferences, toggleSidebar } = uiSlice.actions;
