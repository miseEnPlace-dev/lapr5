interface Response<T> {
  status: number;
  statusText: string;
  data: T;
}

export interface IApi {
  get<T>(url: string): Promise<Response<T>>;
  post<T>(url: string, data: unknown): Promise<Response<T>>;
  put<T>(url: string, data: unknown): Promise<Response<T>>;
  delete<T>(url: string): Promise<Response<T>>;
}
