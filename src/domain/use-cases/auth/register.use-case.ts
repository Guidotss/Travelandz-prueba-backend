import { AuthRepository, CustomError, RegisterDto } from "../../";
import { JwtAdapter } from "../../../config";

interface CustomResponse {
  ok: boolean;
  token: string;
  message: string;
  user: {
    id: string; 
    name: string;
    email: string;
  };
}

interface IRegisterUseCase {
  execute(registerUserDto: RegisterDto): Promise<CustomResponse>;
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.sign
  ) {}
  async execute(registerUserDto: RegisterDto): Promise<CustomResponse> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token) {
      throw new CustomError(500, "Internal server error");
    }

    return {
      ok: true,
      token,
      message: "User registered successfully",
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
      },
    };
  }
}
