import {
  AuthDataSource,
  AuthEntity,
  AuthRepository,
  LoginDto,
  RegisterDto,
} from "../../../domain";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}
  register(registerUserDto: RegisterDto): Promise<AuthEntity> {
    return this.authDataSource.register(registerUserDto);
  }
  login(loginUserDto: LoginDto): Promise<AuthEntity> {
    return this.authDataSource.login(loginUserDto);
  }
}
