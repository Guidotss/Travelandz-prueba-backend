import { CancellationPolicy, Category, Content, Link, Pickup, Price,  } from "../types";


export interface AvalaibleTransferResponse {
  search: Search;
  services: Service[];
}

export interface Search {
  language: string;
  departure: ComeBack;
  comeBack: ComeBack;
  occupancy: Occupancy;
  from: From;
  to: From;
}

export interface Service {
  id: number;
  direction: Direction;
  transferType: TransferType;
  vehicle: Category;
  category: Category;
  pickupInformation: PickupInformation;
  minPaxCapacity: number;
  maxPaxCapacity: number;
  content: Content;
  price: Price;
  rateKey: string;
  cancellationPolicies: CancellationPolicy[];
  links: Link[];
  factsheetId: number;
}

export enum Direction {
  Arrival = "ARRIVAL",
  Departure = "DEPARTURE",
}

export enum TransferType {
  Private = "PRIVATE",
  Shared = "SHARED",
}

export interface PickupInformation {
  from: From;
  to: From;
  date: Date;
  time: string;
  pickup: Pickup;
}

export interface ComeBack {
  date: string;
  time: string;
}

export interface From {
  code: string;
  description: string;
  type: FromType;
}

export enum FromType {
  Atlas = "ATLAS",
  Iata = "IATA",
}

export interface Occupancy {
  adults: number;
  children: number;
  infants: number;
}


export enum Href {
  Availability = "/availability",
  Booking = "/booking",
}

export enum Method {
  Get = "GET",
  Post = "POST",
}

export enum Rel {
  Confirm = "confirm",
  Self = "self",
}

export interface PickupInformation {
  from: From;
  to: From;
  date: Date;
  time: string;
  pickup: Pickup;
}

