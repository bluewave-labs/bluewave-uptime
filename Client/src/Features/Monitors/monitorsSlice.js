import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../Utils/axiosConfig";
const initialState = {
  isLoading: false,
  monitors: [],
  success: null,
  msg: null,
};

export const createMonitor = createAsyncThunk(
  "monitors/createMonitor",
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

export const getMonitors = createAsyncThunk(
  "monitors/getMonitors",
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

export const getMonitorsByUserId = createAsyncThunk(
  "montiors/getMonitorsByUserId",
  async (token, thunkApi) => {
    const user = jwtDecode(token);
    try {
      const res = await axiosInstance.get(
        `/monitors/user/${user._id}?limit=25`,
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

const monitorsSlice = createSlice({
  name: "monitors",
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
      .addCase(getMonitors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonitors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
        state.monitors = action.payload.data;
      })
      .addCase(getMonitors.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Getting montiors failed";
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
        state.monitors = action.payload.data;
      })
      .addCase(getMonitorsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Getting montiors failed";
      })

      // *****************************************************
      // Create Monitor
      // *****************************************************
      .addCase(createMonitor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMonitor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(createMonitor.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to create monitor";
      });
  },
});

export const { setMonitors, clearMonitorState } = monitorsSlice.actions;

export default monitorsSlice.reducer;
