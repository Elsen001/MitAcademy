export type ApiError<T = any> = {
  status: number;
  message: string;
  errors: T | null;
};