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

export interface Category {
  code: string;
  name: string;
}

export interface PickupInformation {
  from: From;
  to: From;
  date: Date;
  time: string;
  pickup: Pickup;
}

export interface Content {
  vehicle: Category;
  category: Category;
  images: Image[];
  transferDetailInfo: TransferDetailInfo[];
  transferRemarks: TransferRemark[];
}

export interface Price {
  totalAmount: number;
  netAmount: number | null;
  currencyId: string;
}

export interface CancellationPolicy {
  amount: number;
  from: Date;
  currencyId: string;
  isForceMajeure: null;
}

export interface Link {
  rel: Rel;
  href: Href;
  method: Method;
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

export interface Image {
  url: string;
  type: ImageType;
}

export enum ImageType {
  Extralarge = "EXTRALARGE",
  Large = "LARGE",
  Medium = "MEDIUM",
  Small = "SMALL",
}

export interface TransferDetailInfo {
  id: string;
  name: string;
  description: string;
  type: TransferDetailInfoType;
}

export enum TransferDetailInfoType {
  GeneralInfo = "GENERAL_INFO",
}

export interface TransferRemark {
  type: TransferRemarkType;
  description: string;
  mandatory: boolean;
}

export enum TransferRemarkType {
  Contract = "CONTRACT",
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

export interface Pickup {
  address: null;
  number: null;
  town: null;
  zip: null;
  description: string;
  altitude: null;
  latitude: null;
  longitude: null;
  checkPickup: CheckPickup;
  pickupId: null;
  stopName: null;
  image: null;
}

export interface CheckPickup {
  mustCheckPickupTime: boolean;
  url: null | string;
  hoursBeforeConsulting: number | null;
}
