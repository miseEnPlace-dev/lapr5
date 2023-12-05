interface Response<T> {
  status: number;
  statusText: string;
  data: T;
}

interface IGetOptions {
  headers?: {
    [key: string]: string;
  };
  params?: {
    [key: string]: string;
  };
}

export interface HttpService {
  get<T>(url: string, { headers, params }?: IGetOptions): Promise<Response<T>>;
  post<T>(url: string, data: unknown): Promise<Response<T>>;
  put<T>(url: string, data: unknown): Promise<Response<T>>;
  patch<T>(url: string, data: unknown): Promise<Response<T>>;
  delete<T>(url: string): Promise<Response<T>>;
}
