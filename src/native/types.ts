import { IpcMainInvokeEvent } from "electron";

export type NativeAPIHandler = (
  event: IpcMainInvokeEvent,
  ...args: any[]
) => any;

export interface MakeHttpRequestArgs {
  url: string;
  method?: string; // GET by default
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: any; // JSON serializable
  timeoutMs?: number; // default 15000
  responseType?: 'json' | 'text' | 'arraybuffer';
}

export interface MakeHttpRequestSuccess {
  ok: true;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
}

export interface MakeHttpRequestError {
  ok: false;
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  error: string; // message
  data?: any; // error response body if any
}

export type MakeHttpRequestResult = MakeHttpRequestSuccess | MakeHttpRequestError;
