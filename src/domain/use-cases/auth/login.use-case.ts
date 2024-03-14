import { AuthRepository, CustomError, LoginDto } from "../..";
import { JwtAdapter } from "../../../config";

interface CustomResponse {
  ok: boolean;
  token: string;
  message: string;
  user: {
    id: string; 
    name: string;
    email: string;
    surname: string; 
  };
}

interface ILoginUseCase {
  execute(loginUserDto: LoginDto): Promise<CustomResponse>;
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.sign
  ) {}
  async execute(loginUserDto: LoginDto): Promise<CustomResponse> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token) {
      throw new CustomError(500, "Internal server error");
    }

    return {
      ok: true,
      token,
      message: "User logged in successfully",
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
        surname: user.surname,
      },
    };
  }
}
