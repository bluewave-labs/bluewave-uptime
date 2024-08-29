import { createSlice } from "@reduxjs/toolkit";

// Initial state for UI settings.
// Add more settings as needed (e.g., theme preferences, user settings)
const initialState = {
  monitors: {
    rowsPerPage: 5,
  },
  team: {
    rowsPerPage: 5,
  },
  sidebar: {
    collapsed: false,
  },
  mode: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRowsPerPage: (state, action) => {
      state[action.payload.table].rowsPerPage = action.payload.value;
    },
    toggleSidebar: (state) => {
      state.sidebar.collapsed = !state.sidebar.collapsed;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const { setRowsPerPage, toggleSidebar, setMode } = uiSlice.actions;
