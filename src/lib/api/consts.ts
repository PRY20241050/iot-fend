export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const DEFAULT_CONFIG = {
  timeout: 0,
  headers: {
    Accept: "application/json",
    "Accept-Language": "es-ES",
    "Content-Type": "application/json",
  },
};

export const getAPIUrl = (url: string): string => {
  return `${API_URL}${url}`;
};

export const getAPILocalUrl = (url: string): string => {
  return `${BASE_URL}/api${url}`;
};
