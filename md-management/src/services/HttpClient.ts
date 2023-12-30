import { injectable } from 'inversify';
import { IHttpClient } from './IServices/IHttpClient';

@injectable()
export class HttpClient implements IHttpClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
  }

  async put<T>(url: string, body: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    const data = await response.json();

    return data;
  }
}
