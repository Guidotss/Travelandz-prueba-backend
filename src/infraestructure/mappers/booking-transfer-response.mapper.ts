import { CancellationPolicy, Category, Content, Link, Pickup, Price } from "../types";


export interface BookingTransferResponse {
  bookings: Booking[];
}

export interface Booking {
  reference: string;
  bookingFileId: null;
  creationDate: Date;
  status: BookingStatus;
  modificationsPolicies: ModificationsPolicies;
  holder: Holder;
  transfers: Transfer[];
  clientReference: string;
  remark: string;
  invoiceCompany: InvoiceCompany;
  supplier: Supplier;
  totalAmount: number;
  totalNetAmount: number;
  pendingAmount: number;
  currency: string;
  links: Link[];
  paymentDataRequired: boolean;
}

type BookingStatus = "CONFIRMED" | "CANCELLED" | "MODIFIED";

export interface Holder {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface InvoiceCompany {
  code: string;
}



export interface ModificationsPolicies {
  cancellation: boolean;
  modification: boolean;
}

export interface Supplier {
  name: string;
  vatNumber: string;
}

export interface Transfer {
  id: number;
  rateKey: string;
  status: string;
  transferType: string;
  vehicle: Category;
  category: Category;
  pickupInformation: IBookingPickupInformation;
  paxes: Pax[];
  content: Content;
  price: Price;
  cancellationPolicies: CancellationPolicy[];
  factsheetId: number;
  arrivalFlightNumber: string;
  departureFlightNumber: null;
  arrivalShipName: null;
  departureShipName: null;
  arrivalTrainInfo: null;
  departureTrainInfo: null;
  transferDetails: TransferDetail[];
  sourceMarketEmergencyNumber: string;
  links: Link[];
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

export interface Pax {
  type: string;
  age: number;
}

export interface IBookingPickupInformation {
  from: IFromBooking;
  to: IFromBooking;
  date: Date;
  time: string;
  pickup: Pickup;
}

export interface IFromBooking {
  code: string;
  description: string;
  type: string;
}




export interface TransferDetail {
  type: string;
  direction: string;
  code: string;
  companyName: null;
}
