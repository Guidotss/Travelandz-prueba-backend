import {
  BookTransferDto,
  TransferRepository,
  Booking,
  UserRepository,
} from "../../";

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
  private userRepository: UserRepository;

  constructor(
    transferRepository: TransferRepository,
    userRepository: UserRepository
  ) {
    this.transferRepository = transferRepository;
    this.userRepository = userRepository;
  }
  async execute(transfer: BookTransferDto): Promise<CustomResponse> {
    const { user_id } = transfer.holder; 

    const bookingTransfer = await this.transferRepository.bookTransfer(
      transfer
    );

    if (!bookingTransfer) {
      return {
        ok: false,
        message: "Transfer not booked",
        bookingTransfer: [],
      };
    }

    await this.userRepository.addBook(user_id, bookingTransfer);

    return {
      ok: true,
      message: "Transfer booked",
      bookingTransfer: bookingTransfer!,
    };
  }
}
