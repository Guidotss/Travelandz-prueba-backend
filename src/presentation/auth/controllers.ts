import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterDto,
  LoginDto,
  LoginUseCase,
  RegisterUseCase,
} from "../../domain";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  private handleErorr(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response
        .header("Content-Type", "application/json")
        .status(error.code)
        .json({
          ok: false,
          error: error.message,
        });
    }
    return response
      .header("Content-Type", "application/json")
      .status(500)
      .json({
        ok: false,
        error: "Internal server error",
      });
  }

  public register = (request: Request, response: Response) => {
    const [error, registerDto] = RegisterDto.fromRequest(request.body);

    if (error) {
      return response
        .header("Content-Type", "application/json")
        .status(400)
        .json({
          ok: false,
          error,
        });
    }
    new RegisterUseCase(this.authRepository)
      .execute(registerDto!)
      .then((result) => {
        return response
          .header("Content-Type", "application/json")
          .status(201)
          .json(result);
      })
      .catch((error) => this.handleErorr(error, response));
  };

  public login = (request: Request, response: Response) => {
    const [error, loginDto] = LoginDto.fromRequest(request.body);

    if (error) {
      return response
        .header("Content-Type", "application/json")
        .status(400)
        .json({
          ok: false,
          error,
        });
    }

    new LoginUseCase(this.authRepository)
      .execute(loginDto!)
      .then((result) => {
        return response
          .header("Content-Type", "application/json")
          .status(200)
          .json(result);
      })
      .catch((error) => this.handleErorr(error, response));
  };
}
