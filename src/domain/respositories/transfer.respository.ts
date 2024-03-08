import { AvailableTransferDto, BookTransferDto } from "../";
import { Service } from "../../infraestructure";

export abstract class TransferRepository {
  abstract getAvailableTransfers(avalaibleTransferDto: AvailableTransferDto): Promise<Service[] | undefined>;
  abstract bookTransfer(bookTransferDto:BookTransferDto): Promise<undefined>;
}
