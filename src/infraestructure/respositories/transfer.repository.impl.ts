import {
  TrasnferDataSource,
  TransferRepository,
  AvailableTransferDto,
} from "../../domain";
import { Service } from "../";

export class TransferRepositoryIml implements TransferRepository {
  constructor(private readonly transferDataSource: TrasnferDataSource) {}

  getAvailableTransfers(avalaibleTransferDto: AvailableTransferDto): Promise<Service[] | undefined> {
    return this.transferDataSource.getAvailableTransfers(avalaibleTransferDto);
  }
}
