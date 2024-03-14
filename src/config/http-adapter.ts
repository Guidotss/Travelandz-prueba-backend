import CryptoJS from "crypto-js";
import { envs } from "./envs-var";
import { BookTransferDto, CustomError } from "../domain";
export interface IHttpAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: <T>(url: string, headers: { [key: string]: any }) => Promise<T>;
  post: <T>(
    url: string,
    body: BookTransferDto,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: { [key: string]: any }
  ) => Promise<T>;
}

export class HttpAdapter implements IHttpAdapter {
  private readonly baseUrl: string;
  private cryptoJS: typeof CryptoJS;

  constructor() {
    this.baseUrl = envs.BASE_URL;
    this.cryptoJS = CryptoJS;
  }

  private caclcXsignature(apiKey: string, secretKey: string) {
    const utcDate = Math.floor(new Date().getTime() / 1000);
    const payload = apiKey + secretKey + utcDate;
    const hash = this.cryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
    return hash;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T>(url: string, headers: { [key: string]: any }): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Api-key": headers?.apiKey,
        "X-Signature": this.caclcXsignature(
          headers?.apiKey,
          headers?.secretKey
        ),
        Accept: "application/json",
      },
    });

    if (response.status != 200 && response.status != 204) {
      console.log(await response.json());
      throw new CustomError(response.status, response.statusText);
    }
    if (response.status == 204) {
      return [] as unknown as T;
    }

    const data = await response.json();
    return data;
  }

  async post<T>(
    url: string,
    body: BookTransferDto,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    headers: { [key: string]: any }
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Api-key": headers?.apiKey,
        "X-Signature": this.caclcXsignature(
          headers?.apiKey,
          headers?.secretKey
        ),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status != 200) {
      throw new CustomError(response.status, response.statusText);
    }

    const data = await response.json();

    return data;
  }
}
