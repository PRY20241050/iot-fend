import axios from "axios";

import { getAuthTokenFromCookie } from "@/lib/auth";
import { DEFAULT_MESSAGE, getError, isBrowser } from "@/lib/utils";

import { API_URL } from "./consts";

const baseURL = API_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 0,
  // showErrors: true,
  headers: {
    Accept: "application/json",
    "Accept-Language": "es-ES",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from cookie if is browser and add to headers
    if (isBrowser) {
      const token = getAuthTokenFromCookie();
      if (token?.access_token && !config.headers.Authorization) {
        config.headers.Authorization = `${token.token_type} ${token.access_token}`;
      }
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return null;
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { message } = getError(error, DEFAULT_MESSAGE);

    if (isBrowser) {
      const data = error?.config?.data || "";
      if (
        message &&
        (typeof data !== "string" || !data.includes("disableErrorMessage"))
      ) {
        console.log('Error', message)
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
