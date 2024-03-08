import CryptoJS from "crypto-js";
import { envs } from "./envs-var";
export interface IHttpAdapter {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, body: object) => Promise<T>;
}

export class HttpAdapter implements IHttpAdapter {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly baseUrl: string;
  private cryptoJS: typeof CryptoJS;

  constructor() {
    this.apiKey = envs.API_KEY;
    this.secretKey = envs.SECRET_KEY;
    this.baseUrl = envs.BASE_URL;
    this.cryptoJS = CryptoJS;
  }

  private caclcXsignature() {
    const utcDate = Math.floor(new Date().getTime() / 1000);
    const payload = this.apiKey + this.secretKey + utcDate;
    const hash = this.cryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
    return hash;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: {
        "Api-Key": this.apiKey,
        "X-Signature": this.caclcXsignature(),
      },
      
    });

    if (response.status == 204) {
      return [] as unknown as T;
    }

    const data = await response.json();
    return data;
  }

  async post<T>(url: string, body: object): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Api-Key": this.apiKey,
        "X-Signature": this.caclcXsignature(),
      },
      body: JSON.stringify(body),
    });

    if (response.status == 204) {
      return [] as unknown as T;
    }

    const data = await response.json();
    return data;
  }
}
