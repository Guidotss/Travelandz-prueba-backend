import { Validators } from "../../../config";

export class RegisterDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static fromRequest(reques: {
    [key: string]: string;
  }): [string?, RegisterDto?] {
    const { name, email, password } = reques;
    if (!name || !email || !password) {
      return ["Name, email and password are required"];
    }
    if (!Validators.email.test(email)) {
      return ["Invalid email"];
    }
    return [undefined, new RegisterDto(name, email, password)];
  }
}
