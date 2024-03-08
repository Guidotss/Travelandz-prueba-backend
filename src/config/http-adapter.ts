import { envs } from "./envs-var";

export interface IHttpAdapter {
  get: <T>(url: string) => Promise<T>;
}

export class HttpAdapter implements IHttpAdapter {
  private readonly apiKey: string;
  private readonly secretKey: string;

  constructor() {
    this.apiKey = envs.API_KEY;
    this.secretKey = envs.SECRET_KEY;
  }

  private caclcXsignature() {
    const utcDate = Math.floor(new Date().getTime() / 1000);
    const payload = this.apiKey + this.secretKey + utcDate;
    const hash = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
    return hash;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        "Api-Key": this.apiKey,
        "X-Signature": this.caclcXsignature(),
      },
    });
    const data = await response.json();
    return data;
  }
}