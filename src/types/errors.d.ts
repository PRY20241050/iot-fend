export type ErrorResponse = {
  message: string;
  status?: number;
};

export type AxiosErrorResponse<T = any> = {
  status: number;
  message: string;
  code?: string;
  data?: T;
};
