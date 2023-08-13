import { Response } from 'express';

export type StringifyQueryObject<T extends string> = { [K in T]?: string };

export interface AppResponseBody<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type IResponse<ResData = unknown, Locals extends Record<string, unknown> = Record<string, unknown>> = Response<
  AppResponseBody<ResData>,
  Locals
>;
