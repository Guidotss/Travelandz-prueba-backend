import { envs, httpAdater } from "../../../config";
import { Hotel, HotelResponse, HotelsDataSource } from "../../../domain";

export class HotelBedsHotelsDataource implements HotelsDataSource {
  private readonly httpAdater = httpAdater;
  private readonly apiKey = envs.API_KEY_HOTELS;
  private readonly secretKey = envs.SECRET_KEY_HOTELS;

  async getHotels(): Promise<Hotel[]> {

    const hotelsResponse = await this.httpAdater.get<HotelResponse>(
      "/hotel-content-api/1.0/hotels?fields=name,code,address&language=ENG&from=1&to=100",
      {
        apiKey: this.apiKey,
        secretKey: this.secretKey,
      }
    );
    const hotels: Hotel[] = hotelsResponse.hotels;

    return hotels;
  }
}
