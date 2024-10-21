import { ErrorResponse } from "@/types/errors";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_ERROR, STATUS_CODES } from "./consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBrowser = typeof window != "undefined";

/**
 * Get the handling errors from the axios response
 */
export function getError(error: any, defaultMessage?: string): ErrorResponse {
  console.log(error);

  if (error?.response) {
    // The request was made and the server responded with a status code
    const { data, status } = error.response;

    const nonFieldErrors = data?.non_field_errors ?? [];

    if (nonFieldErrors.length) {
      return {
        message: nonFieldErrors.join(", "),
        status,
      };
    }

    if (status == STATUS_CODES.SERVER_ERROR) {
      return {
        message: DEFAULT_ERROR.server,
        status,
      };
    }

    return {
      message: data?.message ?? defaultMessage,
      status,
    };
  }

  if (error?.request) {
    // The request was made but no response was received
    return {
      message: DEFAULT_ERROR.server,
      status: STATUS_CODES.SERVER_ERROR,
    };
  }

  return {
    message: error?.message ?? defaultMessage,
    status: STATUS_CODES.SERVER_ERROR,
  };
}

/**
 * Validate string or number if it is empty
 * @param {*} val
 * @returns {boolean}
 */
export function isEmptyValue(val: unknown): boolean {
  if (val == null) {
    return true;
  }

  if (typeof val === "string" && val.trim() === "") {
    return true;
  }

  if (typeof val === "number" && isNaN(val)) {
    return true;
  }

  return false;
}
