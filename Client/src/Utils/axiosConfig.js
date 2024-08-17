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

// Create a new monitor
axiosInstance.createMonitor = async (authToken, monitor) => {
  return axiosInstance.post(`/monitors`, monitor, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Get all uptime monitors for a user
axiosInstance.getMonitorsByUserId = async (
  authToken,
  userId,
  limit,
  types,
  sortOrder,
  normalize
) => {
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit);
  if (types) {
    types.forEach((type) => {
      params.append("type", type);
    });
  }
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (normalize) params.append("normalize", normalize);

  return axiosInstance.get(`/monitors/user/${userId}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Updates a single monitor
axiosInstance.updateMonitor = async (authToken, monitorId, updatedFields) => {
  return axiosInstance.put(`/monitors/${monitorId}`, updatedFields, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

// Deletes a single monitor
axiosInstance.deleteMonitorById = async (authToken, monitorId) => {
  return axiosInstance.delete(`/monitors/${monitorId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
};

export default axiosInstance;
