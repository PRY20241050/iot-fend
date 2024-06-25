export interface PaginationResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
