import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  monitors: [],
  success: null,
  msg: null,
};

export const getMonitors = createAsyncThunk(
  "monitors/getMonitors",
  async (token, thunkApi) => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/monitors");
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const monitorsSlice = createSlice({
  name: "monitors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMonitors.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMonitors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
        console.log(action.payload);
        state.monitors = action.payload.data;
      })
      .addCase(getMonitors.rejected, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      });
  },
});

export const { setMonitors } = monitorsSlice.actions;

export default monitorsSlice.reducer;
