import axios from "axios";
import { clearAuthState } from "../Features/Auth/authSlice";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

class NetworkService {
  constructor(store) {
    this.store = store;
    this.axiosInstance = axios.create({ baseURL: BASE_URL });
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(error);
        if (error.response && error.response.status === 401) {
          console.log("Invalid token revoked");
          networkService;
        }
        return Promise.reject(error);
      }
    );
  }

  // **********************************
  // Create a new monitor
  // **********************************
  async createMonitor(authToken, monitor) {
    return this.axiosInstance.post(`/monitors`, monitor, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  // **********************************
  // Get all uptime monitors for a user
  // **********************************
  async getMonitorsByUserId(
    authToken,
    userId,
    limit,
    types,
    status,
    sortOrder,
    normalize
  ) {
    const params = new URLSearchParams();

    if (limit) params.append("limit", limit);
    if (types) {
      types.forEach((type) => {
        params.append("type", type);
      });
    }
    if (status) params.append("status", status);
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (normalize) params.append("normalize", normalize);

    return this.axiosInstance.get(
      `/monitors/user/${userId}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  // **********************************
  // Get stats for a monitor
  // **********************************
  async getStatsByMonitorId(
    authToken,
    monitorId,
    sortOrder,
    limit,
    dateRange,
    numToDisplay,
    normalize
  ) {
    const params = new URLSearchParams();
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (limit) params.append("limit", limit);
    if (dateRange) params.append("dateRange", dateRange);
    if (numToDisplay) params.append("numToDisplay", numToDisplay);
    if (normalize) params.append("normalize", normalize);

    return this.axiosInstance.get(
      `/monitors/stats/${monitorId}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
  }

  // **********************************
  // Updates a single monitor
  // **********************************
  async updateMonitor(authToken, monitorId, updatedFields) {
    return this.axiosInstance.put(`/monitors/${monitorId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }
  // **********************************
  // Deletes a single monitor
  // **********************************
  async deleteMonitorById(authToken, monitorId) {
    return this.axiosInstance.delete(`/monitors/${monitorId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }
  // **********************************
  // Get certificate
  // **********************************
  async getCertificateExpiry(authToken, monitorId) {
    return this.axiosInstance.get(`/monitors/certificate/${monitorId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // **********************************
  // Register a new user
  // **********************************
  async registerUser(form) {
    return this.axiosInstance.post(`/auth/register`, form);
  }

  // **********************************
  // Log in an exisiting user
  // **********************************
  async loginUser(form) {
    return this.axiosInstance.post(`/auth/login`, form);
  }

  // **********************************
  // Update in an exisiting user
  // **********************************
  async updateUser(authToken, userId, form) {
    return this.axiosInstance.put(`/auth/user/${userId}`, form, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  // **********************************
  // Forgot password request
  // **********************************
  async forgotPassword(form) {
    return this.axiosInstance.post(`/auth/recovery/request`, form);
  }

  async validateRecoveryToken(recoveryToken) {
    return this.axiosInstance.post("/auth/recovery/validate", {
      recoveryToken,
    });
  }

  // **********************************
  // Set new password request
  // **********************************
  async setNewPassword(recoveryToken, form) {
    return this.axiosInstance.post("/auth/recovery/reset", {
      ...form,
      recoveryToken,
    });
  }

  // **********************************
  // Check for admin user
  // **********************************
  async doesAdminExist() {
    return this.axiosInstance.get("/auth/users/admin");
  }

  // **********************************
  // Get all users
  // **********************************
  async getAllUsers(authToken) {
    return this.axiosInstance.get("/auth/users", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  // **********************************
  // Request Invitation Token
  // **********************************
  async requestInvitationToken(authToken, email, role) {
    return this.axiosInstance.post(
      `/auth/invite`,
      { email, role },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  // **********************************
  // Verify Invitation Token
  // **********************************
  async verifyInvitationToken(token) {
    return this.axiosInstance.post(`/auth/invite/verify`, {
      token,
    });
  }

  // **********************************
  // Get all checks for a given monitor
  // **********************************

  async getChecksByMonitor(
    authToken,
    monitorId,
    sortOrder,
    limit,
    dateRange,
    filter,
    page,
    rowsPerPage
  ) {
    const params = new URLSearchParams();
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (limit) params.append("limit", limit);
    if (dateRange) params.append("dateRange", dateRange);
    if (filter) params.append("filter", filter);
    if (page) params.append("page", page);
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage);

    return this.axiosInstance.get(`/checks/${monitorId}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  // **********************************
  // Get all checks for a given user
  // **********************************
  async getChecksByUser(
    authToken,
    userId,
    sortOrder,
    limit,
    dateRange,
    filter,
    page,
    rowsPerPage
  ) {
    const params = new URLSearchParams();
    if (sortOrder) params.append("sortOrder", sortOrder);
    if (limit) params.append("limit", limit);
    if (dateRange) params.append("dateRange", dateRange);
    if (filter) params.append("filter", filter);
    if (page) params.append("page", page);
    if (rowsPerPage) params.append("rowsPerPage", rowsPerPage);
    return this.axiosInstance.get(
      `/checks/user/${userId}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }
}

export default NetworkService;
