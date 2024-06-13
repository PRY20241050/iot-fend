interface GlobalDTO<T = unknown> {
  error?: Error;
  data?: T;
  status?: number;
}
