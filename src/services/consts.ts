export const EMISSION_LIMITS_URL = "/emission_limits/";

export const emissionLimitsByIdUrl = (id: string) => {
  return `${EMISSION_LIMITS_URL}${id}/`;
};

export const MEASUREMENTS_URL = "/measurements/";
export const MEASUREMENTS_PAGINATED_URL = "/measurements/paginated/";
export const DEVICES_URL = "/devices/";

export const lastMeasurementUrl = (deviceId: string) => {
  return `${DEVICES_URL}${deviceId}/sensors/last_measurements/`;
};

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

export const PROFILE_URL = "/profile/";
