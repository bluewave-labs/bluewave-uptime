const errorMessages = {
  // General Errors:
  FRIENDLY_ERROR: "Something went wrong...",
  UNKNOWN_ERROR: "An unknown error occurred",
  // Auth Controller
  UNAUTHORIZED: "Unauthorized access",
  AUTH_ADMIN_EXISTS: "Admin already exists",

  //Error handling middleware
  UNKNOWN_SERVICE: "Unknown service",
  NO_AUTH_TOKEN: "No auth token provided",
  INVALID_AUTH_TOKEN: "Invalid auth token",

  //Onwership Middleware
  VERIFY_OWNER_NOT_FOUND: "Document not found",
  VERIFY_OWNER_UNAUTHORIZED: "Unauthorized access",

  //DB Errors
  DB_USER_EXISTS: "User already exists",
  DB_USER_NOT_FOUND: "User not found",
  DB_TOKEN_NOT_FOUND: "Token not found",
  DB_RESET_PASSWORD_BAD_MATCH:
    "New password must be different from old password",
  DB_FIND_MONTIOR_BY_ID: (monitorId) =>
    `Monitor with id ${monitorId} not found`,
  DB_DELETE_CHECKS: (monitorId) =>
    `No checks found for monitor with id ${monitorId}`,
  DB_DELETE_ALERT: (alertId) => `Alert with id ${alertId} not found`,

  //Auth errors
  AUTH_INCORRECT_PASSWORD: "Incorrect password",
  AUTH_UNAUTHORIZED: "Unauthorized access",

  // Monitor Errros
  MONITOR_GET_BY_ID: "Monitor not found",
  MONITOR_GET_BY_USER_ID: "No monitors found for user",

  // Job Queue Errors
  JOB_QUEUE_WORKER_CLOSE: "Error closing worker",
  JOB_QUEUE_DELETE_JOB: "Job not found in queue",
  JOB_QUEUE_OBLITERATE: "Error obliterating queue",
};

const successMessages = {
  //Alert Controller
  ALERT_CREATE: "Alert created successfully",
  ALERT_GET_BY_USER: "Got alerts successfully",
  ALERT_GET_BY_MONITOR: "Got alerts by Monitor successfully",
  ALERT_GET_BY_ID: "Got alert by Id successfully",
  ALERT_EDIT: "Alert edited successfully",
  ALERT_DELETE: "Alert deleted successfully",

  // Auth Controller
  AUTH_CREATE_USER: "User created successfully",
  AUTH_LOGIN_USER: "User logged in successfully",
  AUTH_UPDATE_USER: "User updated successfully",
  AUTH_CREATE_RECOVERY_TOKEN: "Recovery token created successfully",
  AUTH_VERIFY_RECOVERY_TOKEN: "Recovery token verified successfully",
  AUTH_RESET_PASSWORD: "Password reset successfully",
  AUTH_ADMIN_CHECK: "Admin check completed successfully",
  AUTH_DELETE_USER: "User deleted successfully",

  // Check Controller
  CHECK_CREATE: "Check created successfully",
  CHECK_GET: "Got checks successfully",
  CHECK_DELETE: "Checks deleted successfully",

  //Monitor Controller
  MONITOR_GET_ALL: "Got all monitors successfully",
  MONTIOR_GET_BY_ID: "Got monitor by Id successfully",
  MONITOR_GET_BY_USER_ID: (userId) => `Got monitor for ${userId} successfully"`,
  MONITOR_CREATE: "Monitor created successfully",
  MONITOR_DELETE: "Monitor deleted successfully",
  MONITOR_EDIT: "Monitor edited successfully",

  //Job Queue
  JOB_QUEUE_DELETE_JOB: "Job removed successfully",
  JOB_QUEUE_OBLITERATE: "Queue OBLITERATED!!!",
};

module.exports = {
  errorMessages,
  successMessages,
};
