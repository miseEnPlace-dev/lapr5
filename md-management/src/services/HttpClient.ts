import { injectable } from 'inversify';
import { IHttpClient } from './IServices/IHttpClient';

@injectable()
export class HttpClient implements IHttpClient {
  async get<T>(url: string, query?: { [key: string]: string | undefined }): Promise<T> {
    let fetchUrl = url;
    if (query) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (value) searchParams.append(key, value);
      }
      fetchUrl += '?' + searchParams.toString();
    }
    const response = await fetch(fetchUrl);
    return await response.json();
  }

  async post<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    return data;
  }

  async put<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    return data;
  }

  async patch<T>(url: string, body?: unknown): Promise<T> {
    const response = await fetch(url, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' }
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
