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
      const res = await axios.get(
        import.meta.env.VITE_APP_API_BASE_URL + "/monitors"
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getMonitorsByUserId = createAsyncThunk(
  "montiors/getMonitorsByUserId",
  async (token, thunkApi) => {
    try {
      // TODO get userId and make request
      console.log(token);
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
      // *****************************************************
      // All Monitors
      // *****************************************************
      .addCase(getMonitors.pending, (state) => {
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
      })
      // *****************************************************
      // Monitors by userId
      // *****************************************************

      .addCase(getMonitorsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonitorsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.msg;
        console.log(action.payload);
        state.monitors = action.payload.data;
      })
      .addCase(getMonitorsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      });
  },
});

export const { setMonitors } = monitorsSlice.actions;

export default monitorsSlice.reducer;
