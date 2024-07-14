import axios from "axios";
import { clearAuthState } from "../Features/Auth/authSlice";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

let store;

export const injectStore = (s) => {
  store = s;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    if (error.response && error.response.status === 401) {
      console.log("Invalid token revoked");
      store.dispatch(clearAuthState());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
