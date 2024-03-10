import { Hotel } from "../../interfaces";
import { CustomError, HotelsRepository } from "../../";

export interface CustomResposne {
  ok: boolean;
  message: string;
  data: Hotel[];
}

export interface IGetHotelsUseCase {
  execute(): Promise<CustomResposne>;
}

export class GetHotelsUseCase implements IGetHotelsUseCase {
  constructor(private readonly hotelsRepository: HotelsRepository) {
    this.hotelsRepository = hotelsRepository;
  }
  async execute(): Promise<CustomResposne> {
    const hotels = await this.hotelsRepository.getHotels();
    if (hotels.length === 0) {
      throw new CustomError(404, "No hotels found");
    }

    return {
      ok: true,
      message: "Hotels found",
      data: hotels,
    };
  }
}
