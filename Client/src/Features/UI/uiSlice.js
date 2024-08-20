import { createSlice } from "@reduxjs/toolkit";

// Initial state for UI settings.
// Add more settings as needed (e.g., theme preferences, user settings)
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
    setRowsPerPage: (state, action) => {
      state.table.rowsPerPage = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebar.collapsed = !state.sidebar.collapsed;
    },
  },
});

export default uiSlice.reducer;
export const { setRowsPerPage, toggleSidebar } = uiSlice.actions;
