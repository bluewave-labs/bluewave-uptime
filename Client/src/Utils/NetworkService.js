import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
import { logger } from "./Logger";
class NetworkService {
  constructor(store) {
    this.store = store;
    this.axiosInstance = axios.create({ baseURL: BASE_URL });
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        logger.error(error);
        if (error.response && error.response.status === 401) {
          logger.error("Invalid token received");
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   *
   * ************************************
   * Create a new monitor
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The monitor ID to be sent in the param.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   */

  async getMonitorByid(authToken, monitorId) {
    return this.axiosInstance.get(`/monitors/${monitorId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   *
   * ************************************
   * Create a new monitor
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {Object} monitor - The monitor object to be sent in the request body.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   */
  async createMonitor(authToken, monitor) {
    return this.axiosInstance.post(`/monitors`, monitor, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * ************************************
   * Get all uptime monitors for a user
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} userId - The ID of the user whose monitors are to be retrieved.
   * @param {number} [limit] - The maximum number of monitors to retrieve.
   * @param {Array<string>} [types] - The types of monitors to retrieve.
   * @param {string} [status] - The status of the monitors to retrieve.
   * @param {string} [sortOrder] - The order in which to sort the retrieved monitors.
   * @param {boolean} [normalize] - Whether to normalize the retrieved monitors.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   */
  async getMonitorsByTeamId(
    authToken,
    teamId,
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
      `/monitors/team/${teamId}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * ************************************
   * Get stats for a monitor
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor whose statistics are to be retrieved.
   * @param {string} [sortOrder] - The order in which to sort the retrieved statistics.
   * @param {number} [limit] - The maximum number of statistics to retrieve.
   * @param {string} [dateRange] - The date range for which to retrieve statistics.
   * @param {number} [numToDisplay] - The number of checks to display.
   * @param {boolean} [normalize] - Whether to normalize the retrieved statistics.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   */
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

  /**
   * ************************************
   * Updates a single monitor
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor to be updated.
   * @param {Object} updatedFields - The fields to be updated for the monitor.
   * @returns {Promise<AxiosResponse>} The response from the axios PUT request.
   */
  async updateMonitor(authToken, monitorId, updatedFields) {
    return this.axiosInstance.put(`/monitors/${monitorId}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * ************************************
   * Deletes a single monitor by its ID
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor to be deleted.
   * @returns {Promise<AxiosResponse>} The response from the axios DELETE request.
   */
  async deleteMonitorById(authToken, monitorId) {
    return this.axiosInstance.delete(`/monitors/${monitorId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * ************************************
   * Deletes all checks for all monitor by teamID
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor to be deleted.
   * @returns {Promise<AxiosResponse>} The response from the axios DELETE request.
   */
  async deleteChecksByTeamId(authToken, teamId) {
    return this.axiosInstance.delete(`/checks/team/${teamId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  }
  /**
   * ************************************
   * Pauses a single monitor by its ID
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor to be paused.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   */
  async pauseMonitorById(authToken, monitorId) {
    return this.axiosInstance.post(
      `/monitors/pause/${monitorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * ************************************
   * Gets the certificate expiry for a monitor
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor whose certificate expiry is to be retrieved.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   *
   */
  async getCertificateExpiry(authToken, monitorId) {
    return this.axiosInstance.get(`/monitors/certificate/${monitorId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  /**
   * ************************************
   * Registers a new user
   * ************************************
   *
   * @async
   * @param {Object} form - The form data for the new user to be registered.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   */
  async registerUser(form) {
    return this.axiosInstance.post(`/auth/register`, form);
  }

  /**
   * ************************************
   * Logs in a user
   * ************************************
   *
   * @async
   * @param {Object} form - The form data for the user to be logged in.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   *
   */
  async loginUser(form) {
    return this.axiosInstance.post(`/auth/login`, form);
  }

  /**
   * ************************************
   * Updates a user
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} userId - The ID of the user to be updated.
   * @param {Object} form - The form data for the user to be updated.
   * @returns {Promise<AxiosResponse>} The response from the axios PUT request.
   *
   */
  async updateUser(authToken, userId, form) {
    return this.axiosInstance.put(`/auth/user/${userId}`, form, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  async deleteUser(authToken, userId) {
    return this.axiosInstance.delete(`/auth/user/${userId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  /**
   * ************************************
   * Forgot password request
   * ************************************
   *
   * @async
   * @param {Object} form - The form data for the password recovery request.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   *
   */
  async forgotPassword(form) {
    return this.axiosInstance.post(`/auth/recovery/request`, form);
  }

  /**
   * ************************************
   * Validates a recovery token
   * ************************************
   *
   * @async
   * @param {string} recoveryToken - The recovery token to be validated.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   *
   */
  async validateRecoveryToken(recoveryToken) {
    return this.axiosInstance.post("/auth/recovery/validate", {
      recoveryToken,
    });
  }

  /**
   * ************************************
   * Requests password recovery
   * ************************************
   *
   * @async
   * @param {Object} form - The form data for the password recovery request.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   *
   */
  async setNewPassword(recoveryToken, form) {
    return this.axiosInstance.post("/auth/recovery/reset", {
      ...form,
      recoveryToken,
    });
  }

  /**
   * ************************************
   * Checks if an admin user exists
   * ************************************
   *
   * @async
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   *
   */
  async doesSuperAdminExist() {
    return this.axiosInstance.get("/auth/users/superadmin");
  }

  /**
   * ************************************
   * Get all users
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   *
   */
  async getAllUsers(authToken) {
    return this.axiosInstance.get("/auth/users", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }

  /**
   * ************************************
   * Requests an invitation token
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} email - The email of the user to be invited.
   * @param {string} role - The role of the user to be invited.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   *
   */
  async requestInvitationToken(authToken, email, role) {
    return this.axiosInstance.post(
      `/invite`,
      { email, role },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }

  /**
   * ************************************
   * Verifies an invitation token
   * ************************************
   *
   * @async
   * @param {string} token - The invitation token to be verified.
   * @returns {Promise<AxiosResponse>} The response from the axios POST request.
   *
   */
  async verifyInvitationToken(token) {
    return this.axiosInstance.post(`/invite/verify`, {
      token,
    });
  }

  /**
   * ************************************
   * Get all checks for a given monitor
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} monitorId - The ID of the monitor.
   * @param {string} sortOrder - The order in which to sort the checks.
   * @param {number} limit - The maximum number of checks to retrieve.
   * @param {string} dateRange - The range of dates for which to retrieve checks.
   * @param {string} filter - The filter to apply to the checks.
   * @param {number} page - The page number to retrieve in a paginated list.
   * @param {number} rowsPerPage - The number of rows per page in a paginated list.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   *
   */

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

  /**
   * ************************************
   * Get all checks for a given user
   * ************************************
   *
   * @async
   * @param {string} authToken - The authorization token to be used in the request header.
   * @param {string} userId - The ID of the user.
   * @param {string} sortOrder - The order in which to sort the checks.
   * @param {number} limit - The maximum number of checks to retrieve.
   * @param {string} dateRange - The range of dates for which to retrieve checks.
   * @param {string} filter - The filter to apply to the checks.
   * @param {number} page - The page number to retrieve in a paginated list.
   * @param {number} rowsPerPage - The number of rows per page in a paginated list.
   * @returns {Promise<AxiosResponse>} The response from the axios GET request.
   *
   */
  async getChecksByTeam(
    authToken,
    teamId,
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
      `/checks/team/${teamId}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
  }
}

export default NetworkService;
