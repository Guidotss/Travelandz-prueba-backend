import { AvailableTransferDto, BookTransferDto,Booking, Service, } from "../..";


export abstract class TransferRepository {
  abstract getAvailableTransfers(avalaibleTransferDto: AvailableTransferDto): Promise<Service[] | undefined>;
  abstract bookTransfer(bookTransferDto:BookTransferDto): Promise< Booking[] | undefined>;
}
