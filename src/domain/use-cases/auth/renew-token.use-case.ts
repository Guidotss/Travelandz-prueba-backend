import { JwtAdapter } from "../../../config";
import { CustomError, UserRepository } from "../../";

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

interface IRenewTokenUseCase {
  execute(token: string): Promise<CustomResponse>;
}

type SignToken = (payload: object, duration?: string) => Promise<string | null>;
type VerifyToken = (token: string) => Promise<string | null>;

export class RenewTokenUseCase implements IRenewTokenUseCase {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly signToken: SignToken = JwtAdapter.sign,
    private readonly verifyToken: VerifyToken = JwtAdapter.verify
  ) {}
  async execute(token: string): Promise<CustomResponse> {
    const { id } = (await this.verifyToken(token)) as unknown as { id: string };
    if (!id) throw new CustomError(401, "Invalid token");

    const user = await this.usersRepository.getUserById(id);
    if (!user) throw new CustomError(404, "User not found");

    const newToken = await this.signToken({ id: user.id });
    if (!newToken) throw new CustomError(500, "Error creating token");

    return {
      ok: true,
      token: newToken,
      message: "Token renewed",
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
      },
    };
  }
}
