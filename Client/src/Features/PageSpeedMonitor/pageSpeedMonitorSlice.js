import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { networkService } from "../../main";
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
      const res = await networkService.createMonitor(authToken, monitor);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      const payload = {
        status: false,
        msg: error.message ? error.message : "Unknown error",
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
);

export const getPagespeedMonitorById = createAsyncThunk(
  "monitors/getMonitorById",
  async (data, thunkApi) => {
    try {
      const { authToken, monitorId } = data;
      const res = await networkService.getMonitorByid(authToken, monitorId);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      const payload = {
        status: false,
        msg: error.message ? error.message : "Unknown error",
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
);

export const getPageSpeedByTeamId = createAsyncThunk(
  "pageSpeedMonitors/getPageSpeedByTeamId",
  async (token, thunkApi) => {
    const user = jwtDecode(token);
    try {
      const res = await networkService.getMonitorsByTeamId(
        token,
        user.teamId,
        25,
        ["pagespeed"],
        null,
        "desc",
        false
      );

      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      const payload = {
        status: false,
        msg: error.message ? error.message : "Unknown error",
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
);

export const updatePageSpeed = createAsyncThunk(
  "pageSpeedMonitors/updatePageSpeed",
  async (data, thunkApi) => {
    try {
      const { authToken, monitor } = data;
      const updatedFields = {
        name: monitor.name,
        description: monitor.description,
        interval: monitor.interval,
        // notifications: monitor.notifications,
      };
      const res = await networkService.updateMonitor(
        authToken,
        monitor._id,
        updatedFields
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      const payload = {
        status: false,
        msg: error.message ? error.message : "Unknown error",
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
);

export const deletePageSpeed = createAsyncThunk(
  "pageSpeedMonitors/deletePageSpeed",
  async (data, thunkApi) => {
    try {
      const { authToken, monitor } = data;
      const res = await networkService.deleteMonitorById(
        authToken,
        monitor._id
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      const payload = {
        status: false,
        msg: error.message ? error.message : "Unknown error",
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
);
export const pausePageSpeed = createAsyncThunk(
  "pageSpeedMonitors/pausePageSpeed",
  async (data, thunkApi) => {
    try {
      const { authToken, monitorId } = data;
      const res = await networkService.pauseMonitorById(authToken, monitorId);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return thunkApi.rejectWithValue(error.response.data);
      }
      const payload = {
        status: false,
        msg: error.message ? error.message : "Unknown error",
      };
      return thunkApi.rejectWithValue(payload);
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
      // Monitors by teamId
      // *****************************************************

      .addCase(getPageSpeedByTeamId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPageSpeedByTeamId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.msg;
        state.monitors = action.payload.data;
      })
      .addCase(getPageSpeedByTeamId.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Getting page speed monitors failed";
      })

      // *****************************************************
      .addCase(getPagespeedMonitorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPagespeedMonitorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(getPagespeedMonitorById.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to get pagespeed monitor";
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
      })

      // *****************************************************
      // Update Monitor
      // *****************************************************
      .addCase(updatePageSpeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePageSpeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(updatePageSpeed.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to update page speed monitor";
      })

      // *****************************************************
      // Delete Monitor
      // *****************************************************
      .addCase(deletePageSpeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePageSpeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(deletePageSpeed.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to delete page speed monitor";
      })
      // *****************************************************
      // Pause Monitor
      // *****************************************************
      .addCase(pausePageSpeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pausePageSpeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(pausePageSpeed.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to pause page speed monitor";
      });
  },
});

export const { setMonitors, clearMonitorState } = pageSpeedMonitorSlice.actions;

export default pageSpeedMonitorSlice.reducer;
