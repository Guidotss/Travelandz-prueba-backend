import {
  TrasnferDataSource,
  TransferRepository,
  AvailableTransferDto,
  BookTransferDto,
  Service,
  Booking,
} from "../../../domain";

export class TransferRepositoryIml implements TransferRepository {
  constructor(private readonly transferDataSource: TrasnferDataSource) {}

  getAvailableTransfers(
    avalaibleTransferDto: AvailableTransferDto
  ): Promise<Service[] | undefined> {
    return this.transferDataSource.getAvailableTransfers(avalaibleTransferDto);
  }

  bookTransfer(
    bookTransferDto: BookTransferDto
  ): Promise<Booking[] | undefined> {
    return this.transferDataSource.bookTransfer(bookTransferDto);
  }
}
