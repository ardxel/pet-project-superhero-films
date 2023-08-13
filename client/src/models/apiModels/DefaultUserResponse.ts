export type DefaultResponse<T> = {
  // severity?: AlertColor;
  message?: string;
  data?: T;
  error?: string;
};
