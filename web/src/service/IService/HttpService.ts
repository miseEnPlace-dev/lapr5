interface Response<T> {
  status: number;
  statusText: string;
  data: T;
}

export interface HttpService {
  get<T>(
    url: string,
    {
      headers,
    }?: {
      headers?: {
        [key: string]: string;
      };
    }
  ): Promise<Response<T>>;
  post<T>(url: string, data: unknown): Promise<Response<T>>;
  put<T>(url: string, data: unknown): Promise<Response<T>>;
  delete<T>(url: string): Promise<Response<T>>;
}
