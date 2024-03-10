import { Hotel, HotelsDataSource, HotelsRepository } from "../../../domain";

export class HotelsRepositoryImpl implements HotelsRepository {
  constructor(private readonly hotelsDataSource: HotelsDataSource) {}
  getHotels(): Promise<Hotel[]> {
    return this.hotelsDataSource.getHotels();
  }
}
