import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { networkService } from "../../main";
const initialState = {
  isLoading: false,
  monitors: [],
  success: null,
  msg: null,
};

export const createUptimeMonitor = createAsyncThunk(
  "monitors/createMonitor",
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

export const getUptimeMonitorById = createAsyncThunk(
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

export const getUptimeMonitorsByTeamId = createAsyncThunk(
  "monitors/getMonitorsByTeamId",
  async (token, thunkApi) => {
    const user = jwtDecode(token);
    try {
      const res = await networkService.getMonitorsByTeamId(
        token,
        user.teamId,
        25,
        ["http", "ping"],
        null,
        "desc",
        true
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

export const updateUptimeMonitor = createAsyncThunk(
  "monitors/updateMonitor",
  async (data, thunkApi) => {
    try {
      const { authToken, monitor } = data;
      const updatedFields = {
        name: monitor.name,
        description: monitor.description,
        interval: monitor.interval,
        notifications: monitor.notifications,
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

export const deleteUptimeMonitor = createAsyncThunk(
  "monitors/deleteMonitor",
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

export const pauseUptimeMonitor = createAsyncThunk(
  "monitors/pauseMonitor",
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

export const deleteMonitorChecksByTeamId = createAsyncThunk(
  "monitors/deleteChecksByTeamId",
  async (data, thunkApi) => {
    try {
      const { authToken, teamId } = data;
      const res = await networkService.deleteChecksByTeamId(authToken, teamId);
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

const uptimeMonitorsSlice = createSlice({
  name: "uptimeMonitors",
  initialState,
  reducers: {
    clearUptimeMonitorState: (state) => {
      state.isLoading = false;
      state.monitors = [];
      state.success = null;
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // *****************************************************
      // Monitors by userId
      // *****************************************************

      .addCase(getUptimeMonitorsByTeamId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUptimeMonitorsByTeamId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.msg;
        state.monitors = action.payload.data;
      })
      .addCase(getUptimeMonitorsByTeamId.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Getting uptime monitors failed";
      })

      // *****************************************************
      // Create Monitor
      // *****************************************************
      .addCase(createUptimeMonitor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUptimeMonitor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(createUptimeMonitor.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to create uptime monitor";
      })
      // *****************************************************
      // Get Monitor By Id
      // *****************************************************
      .addCase(getUptimeMonitorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUptimeMonitorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(getUptimeMonitorById.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to get uptime monitor";
      })
      // *****************************************************
      // update Monitor
      // *****************************************************
      .addCase(updateUptimeMonitor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUptimeMonitor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(updateUptimeMonitor.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to update uptime monitor";
      })

      // *****************************************************
      // Delete Monitor
      // *****************************************************
      .addCase(deleteUptimeMonitor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUptimeMonitor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(deleteUptimeMonitor.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to delete uptime monitor";
      })
      // *****************************************************
      // Delete Monitor checks by Team ID
      // *****************************************************
      .addCase(deleteMonitorChecksByTeamId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMonitorChecksByTeamId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(deleteMonitorChecksByTeamId.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to delete monitor checks";
      })
      // *****************************************************
      // Pause Monitor
      // *****************************************************
      .addCase(pauseUptimeMonitor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(pauseUptimeMonitor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.msg = action.payload.msg;
      })
      .addCase(pauseUptimeMonitor.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.msg = action.payload
          ? action.payload.msg
          : "Failed to pause uptime monitor";
      });
  },
});

export const { setUptimeMonitors, clearUptimeMonitorState } =
  uptimeMonitorsSlice.actions;

export default uptimeMonitorsSlice.reducer;
