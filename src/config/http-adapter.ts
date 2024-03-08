export interface IHttpAdapter {
  get: <T>(url: string) => Promise<T>;
}

export class HttpAdapter implements IHttpAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
