import { Request, Response } from "express";
import {
  AvailableTransferDto,
  AvalaibleTransferUseCase,
  CustomError,
  TransferRepository,
} from "../../domain";

export class TransferController {
  constructor(private readonly transferRepository: TransferRepository) {
    this.transferRepository = transferRepository;
  }

  private handleErrors = (error: unknown, response: Response) => {
    if (error instanceof CustomError) {
      return response
        .header("Content-Type", "application/json")
        .status(error.code)
        .json({
          ok: false,
          message: error.message,
        });
    }

    return response
      .header("Content-Type", "application/json")
      .status(500)
      .json({
        ok: false,
        message: "Internal Server Error",
      });
  };

  public getAvailableTransfers = (request: Request, response: Response) => {
    try {
      const [error, avalaibleTransferDto] = AvailableTransferDto.fromRequest(
        request.body
      );

      if (error) {
        return response
          .header("Content-Type", "application/json")
          .status(400)
          .json({
            ok: false,
            message: error,
          });
      }

      new AvalaibleTransferUseCase(this.transferRepository)
        .execute(avalaibleTransferDto!)
        .then((result) => {
          return response
            .header("Content-Type", "application/json")
            .status(200)
            .json(result);
        })
        .catch((error) => {
          this.handleErrors(error, response);
        });
    } catch (error) {
      console.log(error);
      this.handleErrors(error, response);
    }
  };

  public bookTransfer = async (request: Request, response: Response) => {
    return response
      .header("Content-Type", "application/json")
      .status(200)
      .json({ ok: true, message: "Transfer booked" });
  };
}
