import jwt from "jsonwebtoken";
import { envs } from "./envs-var";

export class JwtAdapter {
  static async sign(payload: object, expiresIn = "2h"): Promise<string | null> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, envs.JWT_SECRET, { expiresIn }, (error, token) => {
        if (error) reject(null);
        resolve(token!);
      });
    });
  }

  static async verify<T>(token: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, envs.JWT_SECRET, (error, decoded) => {
        if (error) reject(null);
        console.log(decoded);
        resolve(decoded as T);
      });
    });
  }
}
