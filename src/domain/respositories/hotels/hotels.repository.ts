import { Hotel } from "../../interfaces";

export abstract class HotelsRepository { 
    abstract getHotels(): Promise<Hotel[]>;
}

