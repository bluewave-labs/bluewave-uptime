import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const initialState = {
  isLoading: false,
  authToken: "",
  user: "",
  success: null,
  msg: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (form, thunkApi) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, form);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (form, thunkApi) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, form);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

const handleAuthFulfilled = (state, action) => {
  state.isLoading = false;
  state.success = action.payload.success;
  state.msg = action.payload.msg;
  state.authToken = action.payload.data;
  const decodedToken = jwtDecode(action.payload.data);
  const user = { ...decodedToken };
  state.user = user;
};
const handleAuthRejected = (state, action) => {
  state.isLoading = false;
  state.success = action.payload.success;
  state.msg = action.payload.msg;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.authToken = "";
      state.user = "";
      state.isLoading = false;
      state.success = true;
      state.msg = "Logged out successfully";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register thunk
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, handleAuthFulfilled)
      .addCase(register.rejected, handleAuthRejected)
      // Login thunk
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, handleAuthFulfilled)
      .addCase(login.rejected, handleAuthRejected);
  },
});

export default authSlice.reducer;
export const { clearAuthState } = authSlice.actions;
