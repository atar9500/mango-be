export type AuthResponse<T = unknown> = {
  body?: T;
  headers?: Record<string, string>;
};
