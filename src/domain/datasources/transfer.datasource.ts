import { AvailableTransferDto } from "../";
import { Service } from "../../infraestructure";


export abstract class TrasnferDataSource {
  abstract getAvailableTransfers(avalaiblesTransferDto: AvailableTransferDto): Promise<Service[] | undefined>;
}