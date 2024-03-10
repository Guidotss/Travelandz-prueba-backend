import {
  AvailableTransferDto,
  AvalaibleTransferResponse,
  BookTransferDto,
  BookingTransferResponse,
  CustomError,
  Service,
  TrasnferDataSource,
  Booking,
} from "../../../domain";
import { envs, httpAdater } from "../../../config";

export class HotelBedsTrasnferDatasource implements TrasnferDataSource {
  private readonly httpAdater = httpAdater;
  private readonly apiKey = envs.API_KEY_TRANSFERS;
  private readonly secretKey = envs.SECRET_KEY_TRANSFERS;
  async getAvailableTransfers(
    avalaibleTransferDto: AvailableTransferDto
  ): Promise<Service[] | undefined> {
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
      `/transfer-api/1.0/availability/${language}/from/${fromType}/${fromCode}/to/${toType}/${toCode}/${departign}/${adults}/${children}/${infants}`,
      {
        apiKey: this.apiKey,
        secretKey: this.secretKey,
      }
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

  async bookTransfer(
    bookTransferDto: BookTransferDto
  ): Promise<Booking[] | undefined> {
    const response = await this.httpAdater.post<BookingTransferResponse>(
      "/bookings",
      bookTransferDto,
      {
        apiKey: this.apiKey,
        secretKey: this.secretKey,
      }
    );

    const bookings: Booking[] = response.bookings;

    if (!bookings) {
      throw new CustomError(404, "No bookings found for the given parameters.");
    }

    return bookings;
  }
}
