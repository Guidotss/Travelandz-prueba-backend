import { BookTransferDto, TransferRepository, Booking } from "../../";

interface CustomResponse {
  ok: boolean;
  message: string;
  bookingTransfer: Booking[];
}

interface IBookTransferUseCase {
  execute(transfer: BookTransferDto): Promise<CustomResponse>;
}

export class BookTransferUseCase implements IBookTransferUseCase {
  private transferRepository: TransferRepository;

  constructor(transferRepository: TransferRepository) {
    this.transferRepository = transferRepository;
  }
  async execute(transfer: BookTransferDto): Promise<CustomResponse> {
    const bookingTransfer = await this.transferRepository.bookTransfer(
      transfer
    );

    return {
      ok: true,
      message: "Transfer booked",
      bookingTransfer: bookingTransfer!,
    };
  }
}
