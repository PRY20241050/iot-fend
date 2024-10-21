import axios from "axios";

import { getAuthTokenFromCookie } from "@/lib/auth";
import { DEFAULT_ERROR, getError, isBrowser, STATUS_CODES } from "@/lib/utils";

import { API_URL } from "./consts";
import { toast } from "@/components/ui/use-toast";

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
    console.log("Error", error);
    return null;
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { message, status } = getError(error);

    if (isBrowser) {
      const data = error?.config?.data || "";
      if (
        message &&
        (typeof data !== "string" || !data.includes("disableErrorMessage"))
      ) {
        if (status !== STATUS_CODES.SERVER_ERROR && data.includes("onlyServer"))
          return;

        toast({
          variant: "destructive",
          title: DEFAULT_ERROR.header,
          description: message,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
