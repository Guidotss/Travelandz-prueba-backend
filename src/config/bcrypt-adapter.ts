import { hash, compare } from "bcrypt";

export class BcryptAdapter {
  static async hash(plaintext: string, salt = 12): Promise<string> {
    return hash(plaintext, salt);
  }

  static async compare(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest);
  }
}
