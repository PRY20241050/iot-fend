import useSWR, { type SWRResponse } from 'swr'
import { type BareFetcher, type PublicConfiguration } from 'swr/_internal'
import useSWRImmutable from 'swr/immutable'

import type { FetcherOptions } from '@/types/api'
import { isEmptyValue } from '@/lib/utils'

import { fetcher, fetcherNative, post } from './api'

const defaultConfig = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true
}

export function useRequest<T>(
  key: FetcherOptions | null,
  config: Partial<PublicConfiguration<T, any, BareFetcher<T>>> | undefined = defaultConfig
): SWRResponse<T> {
  return useSWR<T>(key, fetcher, config)
}

// export function useRequestImmutable<T>(url: string, params: Params = {}): SWRResponse<T> {
//   if (isEmptyValue(url)) {
//     throw new Error('Url is required')
//   }

//   return useSWRImmutable<T>({ url, params }, fetcher)
// }

export function useRequestNative<T>(input: RequestInfo | URL): SWRResponse<T> {
  if (isEmptyValue(input)) {
    throw new Error('Url is required')
  }

  return useSWRImmutable<T>(input, fetcherNative)
}

export function usePostRequest<T>(
  key: FetcherOptions | null,
  config: Partial<PublicConfiguration<T, any, BareFetcher<T>>> | undefined = defaultConfig
): SWRResponse<T> {
  return useSWR<T>(key, post, config)
}

