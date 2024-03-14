import { Validators } from "../../../config";

export class RegisterDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly surname: string,
    public readonly password: string
  ) {}

  static fromRequest(reques: {
    [key: string]: string;
  }): [string?, RegisterDto?] {
    const { name, email,surname ,password } = reques;
    if (!name || !email || !password || !surname) {
      return ["Missing fields, name, email, password and surname are required"];
    }
    if (!Validators.email.test(email)) {
      return ["Invalid email"];
    }
    return [undefined, new RegisterDto(name, email,surname,password)];
  }
}
