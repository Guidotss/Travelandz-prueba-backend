import { Hotel } from "../../interfaces";

export abstract class HotelsDataSource {
    abstract getHotels(): Promise<Hotel[]>;
}