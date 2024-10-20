import { type AxiosErrorResponse } from '@/types/errors'

import { DEFAULT_ERROR, STATUS_CODES } from './consts'

/**
 * Get the handling errors from the axios response
 */
export function getResponseError(error: any, defaultMessage?: string): AxiosErrorResponse {
  if (error?.response) {
    const { data, status } = error.response ?? {}

    const nonFieldErrors = data?.non_field_errors ?? []

    if (nonFieldErrors.length) {
      return {
        status,
        message: nonFieldErrors[0] ?? defaultMessage,
        data
      }
    }

    return {
      status,
      message: data?.message ?? data?.error_description ?? defaultMessage,
      data
    }
  }

  if (error?.request) {
    return {
      status: STATUS_CODES.SERVER_ERROR,
      message: error?.message ?? DEFAULT_ERROR.server,
      data: null
    }
  }

  return {
    status: STATUS_CODES.BAD_REQUEST,
    message: error?.message ?? defaultMessage,
    data: null
  }
}
