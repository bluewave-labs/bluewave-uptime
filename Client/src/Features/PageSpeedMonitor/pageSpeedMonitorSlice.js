import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../Utils/axiosConfig";
const initialState = {
  isLoading: false,
  monitors: [],
  success: null,
  msg: null,
};

export const createPageSpeed = createAsyncThunk(
  "pageSpeedMonitors/createPageSpeed",
  async (data, thunkApi) => {
    try {
      const { authToken, monitor } = data;

      const res = await axiosInstance.post(`/monitors`, monitor, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPageSpeedMonitors = createAsyncThunk(
  "pageSpeedMonitors/getPageSpeedMonitors",
  async (token, thunkApi) => {
    try {
      const res = await axiosInstance.get("/monitors");
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getPageSpeedByUserId = createAsyncThunk(
  "pageSpeedMonitors/getPageSpeedByUserId",
  async (token, thunkApi) => {
    const user = jwtDecode(token);
    try {
      const res = await axiosInstance.get(
        `/monitors/user/${user._id}?limit=25&type=pagespeed&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const pageSpeedMonitorSlice = createSlice({
  name: "pageSpeedMonitor",
  initialState,
  reducers: {
    clearMonitorState: (state) => {
      state.isLoading = false;
      state.monitors = [];
      state.success = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // *****************************************************
      // All Monitors
      // *****************************************************
      .addCase(getPageSpeedMonitors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageSpeedMonitors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
        state.monitors = action.payload.data;
      })
      .addCase(getPageSpeedMonitors.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Getting montiors failed";
      })
      // *****************************************************
      // Monitors by userId
      // *****************************************************

      .addCase(getPageSpeedByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageSpeedByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.msg;
        state.monitors = action.payload.data;
      })
      .addCase(getPageSpeedByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Getting page speed monitors failed";
      })

      // *****************************************************
      // Create Monitor
      // *****************************************************
      .addCase(createPageSpeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPageSpeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(createPageSpeed.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to create page speed monitor";
      });
  },
});

export const { setMonitors, clearMonitorState } = pageSpeedMonitorSlice.actions;

export default pageSpeedMonitorSlice.reducer;
