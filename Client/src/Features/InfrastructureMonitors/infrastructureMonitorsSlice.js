import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { networkService } from "../../main";

export const FormAction = Object.freeze({
	NONE: "none",
	DELETE: "delete",
	UPDATE: "update",
	GET: "get",
});

const initialState = {
	isLoading: false,
	monitorsSummary: [],
	success: null,
	msg: null,
	selectedInfraMonitor: null,
	formAction: FormAction.NONE,
};

export const createInfrastructureMonitor = createAsyncThunk(
	"infrastructureMonitors/createMonitor",
	async (data, thunkApi) => {
		try {
			const { authToken, monitor } = data;
			const res = await networkService.createMonitor({
				authToken: authToken,
				monitor: monitor,
			});
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

export const checkInfrastructureEndpointResolution = createAsyncThunk(
	"infrastructureMonitors/CheckEndpoint",
	async (data, thunkApi) => {
		try {
			const { authToken, monitorURL } = data;

			const res = await networkService.checkEndpointResolution({
				authToken: authToken,
				monitorURL: monitorURL,
			});
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

export const getInfrastructureMonitorById = createAsyncThunk(
	"infrastructureMonitors/getMonitorById",
	async (data, thunkApi) => {
		try {
			const { authToken, monitorId } = data;
			const res = await networkService.getMonitorById({
				authToken: authToken,
				monitorId: monitorId,
			});
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

export const getInfrastructureMonitorsByTeamId = createAsyncThunk(
	"infrastructureMonitors/getMonitorsByTeamId",
	async (token, thunkApi) => {
		const user = jwtDecode(token);
		try {
			const res = await networkService.getMonitorsAndSummaryByTeamId({
				authToken: token,
				teamId: user.teamId,
				types: ["hardware"],
				limit: 1,
				rowsPerPage: 0,
			});
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

export const updateInfrastructureMonitor = createAsyncThunk(
	"infrastructureMonitors/updateMonitor",
	async (data, thunkApi) => {
		try {
			const { authToken, monitor } = data;
			const updatedFields = {
				name: monitor.name,
				description: monitor.description,
				interval: monitor.interval,
				notifications: monitor.notifications,
				threshold: monitor.threshold,
			};
			const res = await networkService.updateMonitor({
				authToken: authToken,
				monitorId: monitor._id,
				updatedFields: updatedFields,
			});
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

export const deleteInfrastructureMonitor = createAsyncThunk(
	"infrastructureMonitors/deleteMonitor",
	async (data, thunkApi) => {
		try {
			const { authToken, monitorId } = data;
			const res = await networkService.deleteMonitorById({
				authToken: authToken,
				monitorId: monitorId,
			});
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

export const pauseInfrastructureMonitor = createAsyncThunk(
	"infrastructureMonitors/pauseMonitor",
	async (data, thunkApi) => {
		try {
			const { authToken, monitorId } = data;
			const res = await networkService.pauseMonitorById({
				authToken: authToken,
				monitorId: monitorId,
			});
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

export const deleteInfrastructureMonitorChecksByTeamId = createAsyncThunk(
	"infrastructureMonitors/deleteChecksByTeamId",
	async (data, thunkApi) => {
		try {
			const { authToken, teamId } = data;
			const res = await networkService.deleteChecksByTeamId({
				authToken: authToken,
				teamId: teamId,
			});
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

export const deleteAllInfrastructureMonitors = createAsyncThunk(
	"infrastructureMonitors/deleteAllMonitors",
	async (data, thunkApi) => {
		try {
			const { authToken } = data;
			const res = await networkService.deleteAllMonitors({
				authToken: authToken,
			});
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

const infrastructureMonitorsSlice = createSlice({
	name: "infrastructureMonitors",
	initialState,
	reducers: {
		clearInfrastructureMonitorState: (state) => {
			state.isLoading = false;
			state.monitorsSummary = [];
			state.success = null;
			state.msg = null;
		},
		resetInfrastructureMonitorFormAction: (state) => {
			state.formAction = initialState.formAction;
		},
	},
	extraReducers: (builder) => {
		builder
			// *****************************************************
			// Monitors by teamId
			// *****************************************************

			.addCase(getInfrastructureMonitorsByTeamId.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(getInfrastructureMonitorsByTeamId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.msg;
				state.monitorsSummary = action.payload.data;
			})
			.addCase(getInfrastructureMonitorsByTeamId.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Getting infrastructure monitors failed";
			})

			// *****************************************************
			// Create Monitor
			// *****************************************************
			.addCase(createInfrastructureMonitor.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(createInfrastructureMonitor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
			})
			.addCase(createInfrastructureMonitor.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to create infrastructure monitor";
			})
			// *****************************************************
			// Resolve Endpoint
			// *****************************************************
			.addCase(checkInfrastructureEndpointResolution.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(checkInfrastructureEndpointResolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
			})
			.addCase(checkInfrastructureEndpointResolution.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to check endpoint resolution";
			})
			// *****************************************************
			// Get Monitor By Id
			// *****************************************************
			.addCase(getInfrastructureMonitorById.pending, (state) => {
				state.formAction = FormAction.GET;
				state.isLoading = true;
				state.success = false;
			})
			.addCase(getInfrastructureMonitorById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
				state.selectedInfraMonitor = action.payload.data;
			})
			.addCase(getInfrastructureMonitorById.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to get infrastructure monitor";
			})
			// *****************************************************
			// update Monitor
			// *****************************************************
			.addCase(updateInfrastructureMonitor.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(updateInfrastructureMonitor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
			})
			.addCase(updateInfrastructureMonitor.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to update infrastructure monitor";
			})

			// *****************************************************
			// Delete Monitor
			// *****************************************************
			.addCase(deleteInfrastructureMonitor.pending, (state) => {
				state.formAction = FormAction.DELETE;
				state.isLoading = true;
				state.success = false;
			})
			.addCase(deleteInfrastructureMonitor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
			})
			.addCase(deleteInfrastructureMonitor.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to delete infrastructure monitor";
			})
			// *****************************************************
			// Delete Monitor checks by Team ID
			// *****************************************************
			.addCase(deleteInfrastructureMonitorChecksByTeamId.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(deleteInfrastructureMonitorChecksByTeamId.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
			})
			.addCase(deleteInfrastructureMonitorChecksByTeamId.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to delete monitor checks";
			})
			// *****************************************************
			// Pause Monitor
			// *****************************************************
			.addCase(pauseInfrastructureMonitor.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(pauseInfrastructureMonitor.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
				state.selectedInfraMonitor = action.payload.data;
			})
			.addCase(pauseInfrastructureMonitor.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload
					? action.payload.msg
					: "Failed to pause infrastructure monitor";
			})
			// *****************************************************
			// Delete all Monitors
			// *****************************************************
			.addCase(deleteAllInfrastructureMonitors.pending, (state) => {
				state.isLoading = true;
				state.success = false;
			})
			.addCase(deleteAllInfrastructureMonitors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.success = action.payload.success;
				state.msg = action.payload.msg;
			})
			.addCase(deleteAllInfrastructureMonitors.rejected, (state, action) => {
				state.isLoading = false;
				state.success = false;
				state.msg = action.payload ? action.payload.msg : "Failed to delete all monitors";
			});
	},
});

export const { clearInfrastructureMonitorState, resetInfrastructureMonitorFormAction } =
	infrastructureMonitorsSlice.actions;

export default infrastructureMonitorsSlice.reducer;
