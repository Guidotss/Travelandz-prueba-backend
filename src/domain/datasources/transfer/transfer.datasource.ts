import { AvailableTransferDto, BookTransferDto } from "../..";
import { Booking, Service } from "../../../infraestructure";


export abstract class TrasnferDataSource {
  abstract getAvailableTransfers(avalaiblesTransferDto: AvailableTransferDto): Promise<Service[] | undefined>;
  abstract bookTransfer(bookTransferDto: BookTransferDto): Promise<Booking[] | undefined>;
}