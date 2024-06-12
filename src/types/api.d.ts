import { type AxiosRequestConfig } from 'axios'

export type Params = Record<string, any>

export type FetcherOptions<D = any> = AxiosRequestConfig<D> & {
  url: string;
  params?: Params;
};
