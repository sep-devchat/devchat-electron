import { IpcMainInvokeEvent } from "electron";

export interface AppSettings {
  appBaseUrl: string;
  apiBaseUrl: string;
}

export interface PaginationDto {
  page: number;
  take: number;
  totalRecord: number;
  totalPage: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ApiResponseDto<T = any> {
  message: string;
  data: T;
  pagination?: PaginationDto;
}

export interface ApiError<T = any> {
  code: string;
  message: string;
  detail: T;
  status?: number;
}

export interface MakeHttpRequestParams {
  url: string;
  method: string;
  body: any;
  headers?: Record<string, any>;
}

export interface MakeHttpRequestResult<T = any, E = any> {
  ok: boolean;
  status?: number;
  headers?: Record<string, string>;
  response?: ApiResponseDto<T>;
  error?: ApiError<E> | E;
}

export type NativeAPIHandler = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => any;