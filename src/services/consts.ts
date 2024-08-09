// Limits
export const EMISSION_LIMITS_URL = "/emission-limits/";
export const emissionLimitsByIdUrl = (id: string) => {
  return `${EMISSION_LIMITS_URL}${id}/`;
};

// Measurements
export const MEASUREMENTS_URL = "/measurements/";
export const MEASUREMENTS_PAGINATED_URL = "/measurements/paginated/";

// Devices
export const DEVICES_URL = "/devices/";
export const lastMeasurementUrl = (deviceId: string) => {
  return `${DEVICES_URL}${deviceId}/sensors/last-measurements/`;
};

// Auth
export const LOGIN_URL = "/login/";
export const PASSWORD_RESET_URL = "/password-reset/";
export const PASSWORD_RESET_CONFIRM_URL = "/password-reset-confirm/";
export const CHANGE_PASSWORD_URL = "/change-password/";
export const passwordResetConfirmUrl = (
  uid: string | null,
  token: string | null
) => {
  return `${PASSWORD_RESET_CONFIRM_URL}${uid}/${token}/`;
};

// Users
export const PROFILE_URL = "/profile/";

// Alerts
export const MY_ALERTS_URL = "/my-alerts/";
export const MARK_MY_ALERTS_AS_READ_URL = `${MY_ALERTS_URL}mark-as-read/`;
