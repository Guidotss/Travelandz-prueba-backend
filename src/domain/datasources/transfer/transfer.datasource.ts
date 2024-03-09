import { AvailableTransferDto, BookTransferDto, Booking, Service } from "../..";

export abstract class TrasnferDataSource {
  abstract getAvailableTransfers(
    avalaiblesTransferDto: AvailableTransferDto
  ): Promise<Service[] | undefined>;
  abstract bookTransfer(
    bookTransferDto: BookTransferDto
  ): Promise<Booking[] | undefined>;
}
