import { Request, Response } from "express";
import {
  AvailableTransferDto,
  AvalaibleTransferUseCase,
  BookTransferDto,
  BookTransferUseCase,
  CustomError,
  GetBookedTransfersUseCase,
  TransferRepository,
  UserRepository,
} from "../../domain";

export class TransferController {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly userRepository: UserRepository
  ) {
    this.transferRepository = transferRepository;
    this.userRepository = userRepository;
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
    console.log(error);
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

  public bookTransfer = (request: Request, response: Response) => {
    try {
      const [error, bookTransferDto] = BookTransferDto.fromRequest(
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

      new BookTransferUseCase(this.transferRepository, this.userRepository)
        .execute(bookTransferDto!)
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

  public getBookedTransfers = (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      if (!id) {
        return response
          .header("Content-Type", "application/json")
          .status(400)
          .json({
            ok: false,
            message: "Id is required",
          });
      }

      new GetBookedTransfersUseCase(this.userRepository)
        .execute(id)
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
}
