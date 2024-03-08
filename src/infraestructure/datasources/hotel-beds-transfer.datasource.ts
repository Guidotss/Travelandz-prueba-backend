import {
  AvailableTransferDto,
  BookTransferDto,
  CustomError,
  TrasnferDataSource,
} from "../../domain";
import { httpAdater } from "../../config";
import { AvalaibleTransferResponse, Service } from "../";

export class HotelBedsTrasnferDatasource implements TrasnferDataSource {

  private readonly httpAdater = httpAdater;

  async getAvailableTransfers(avalaibleTransferDto: AvailableTransferDto): Promise<Service[] | undefined> {
    const {
      adults,
      children,
      departign,
      fromCode,
      fromType,
      infants,
      language,
      toCode,
      toType,
    } = avalaibleTransferDto;

    const response = await this.httpAdater.get<AvalaibleTransferResponse>(
      `/availability/${language}/from/${fromType}/${fromCode}/to/${toType}/${toCode}/${departign}/${adults}/${children}/${infants}`
    );
    const services: Service[] = response.services;

    if (!services) {
      throw new CustomError(
        404,
        "No transfers found for the given parameters."
      );
    }

    return services;
  }


  bookTransfer(bookTransferDto:BookTransferDto): Promise<undefined> {
    console.log(bookTransferDto);
    throw new Error("Method not implemented.");
  }
}
