export class LoginDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static fromRequest(request: { [key: string]: string }): [string?, LoginDto?] {
    const { email, password } = request;
    if (!email || !password) {
      return ["Email and password are required"];
    }
    return [undefined, new LoginDto(email, password)];
  }
}
