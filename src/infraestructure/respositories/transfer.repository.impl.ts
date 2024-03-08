import {
  TrasnferDataSource,
  TransferRepository,
  AvailableTransferDto,
  BookTransferDto,
} from "../../domain";
import { Service } from "../";

export class TransferRepositoryIml implements TransferRepository {
  constructor(private readonly transferDataSource: TrasnferDataSource) {}

  getAvailableTransfers(avalaibleTransferDto: AvailableTransferDto): Promise<Service[] | undefined> {
    return this.transferDataSource.getAvailableTransfers(avalaibleTransferDto);
  }

  bookTransfer(bookTransferDto: BookTransferDto): Promise<undefined> {
    console.log(bookTransferDto); 
    throw new Error("Method not implemented.");
  }
}
