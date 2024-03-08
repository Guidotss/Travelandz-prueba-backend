import { AuthEntity, LoginDto, RegisterDto } from "../../";

export abstract class AuthDataSource {
  abstract register(registerUserDto: RegisterDto): Promise<AuthEntity>;
  abstract login(loginUserDto: LoginDto): Promise<AuthEntity>;
}
