import type { FetcherOptions } from "@/types/api";
import { isEmptyValue } from "@/lib/utils";

import apiClient from "./apiClient";

export async function fetcher<T>({
  url,
  headers = {},
  params = {},
  ...restConfig
}: FetcherOptions): Promise<T> {
  if (isEmptyValue(url)) {
    throw new Error("The url parameter is required");
  }

  return await apiClient
    .get<T>(url, { headers, params, ...restConfig })
    .then((res) => res.data);
}

export async function post<T>({
  url,
  headers = {},
  params = {},
}: FetcherOptions): Promise<T> {
  if (isEmptyValue(url)) {
    throw new Error("The url parameter is required");
  }

  return await apiClient
    .post<T>(url, params, { headers })
    .then((res) => res.data);
}

export async function destroy<T>({
  url,
  params = {},
}: FetcherOptions): Promise<T> {
  if (isEmptyValue(url)) {
    throw new Error("The url parameter is required");
  }

  return await apiClient
    .delete<T>(url, params)
    .then((res) => res.data);
}

export async function fetcherNative<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  return await fetch(input, init).then<T>((res) => res.json());
}
