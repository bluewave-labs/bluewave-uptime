import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    _id: 1,
    userId: 1,
    name: "Google",
    description: "Search engine",
    url: "https://www.google.com",
    isActive: true,
    interval: 1000,
    createdAt: "2021-01",
    updatedAt: "2021-01",
  },
  {
    _id: 2,
    userId: 1,
    name: "Yahoo",
    description: "Search engine",
    url: "https://www.yahoo.com",
    isActive: true,
    interval: 1000,
    createdAt: "2021-01",
    updatedAt: "2021-01",
  },
];

const monitorsSlice = createSlice({
  name: "monitors",
  initialState,
  reducers: { setMonitors: (state, action) => action.payload },
});

export const { setMonitors } = monitorsSlice.actions;

export default monitorsSlice.reducer;
