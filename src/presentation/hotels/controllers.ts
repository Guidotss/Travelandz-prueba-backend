import { Request, Response } from "express";
import { CustomError, GetHotelsUseCase, HotelsRepository } from "../../domain";

export class HotelsControllers {
  constructor(private readonly hotelsRepository: HotelsRepository) {
    this.hotelsRepository = hotelsRepository;
  }

  private handleErrors = (error: unknown, response: Response) => {
    if (error instanceof CustomError) {
      return response
        .header({ "Content-Type": "application/json" })
        .status(error.code)
        .json({
          ok: false,
          message: error.message,
        });
    }
    console.log(error);
    return response
      .header({ "Content-Type": "application/json" })
      .status(500)
      .json({
        ok: false,
        message: "Internal Server Error",
      });
  };

  public getHotels = (request: Request, response: Response) => {
    try {
      new GetHotelsUseCase(this.hotelsRepository)
        .execute()
        .then((result) => {
          return response
            .header({ "Content-Type": "application/json" })
            .status(200)
            .json(result);
        })
        .catch((error) => {
          return this.handleErrors(error, response);
        });
    } catch (error) {
      return this.handleErrors(error, response);
    }
  };
}
