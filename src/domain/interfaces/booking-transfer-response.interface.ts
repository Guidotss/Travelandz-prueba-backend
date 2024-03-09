import { CancellationPolicy, Category, Content, Link, Pickup, Price } from ".";


export interface BookingTransferResponse {
  bookings: Booking[];
}

export interface Booking {
  reference: string;
  bookingFileId: string | null;
  creationDate: string;
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

//= "CONFIRMED" | "CANCELLED" | "MODIFIED";
export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  MODIFIED = "MODIFIED",
}

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
  departureFlightNumber: string | null;
  arrivalShipName: null;
  departureShipName: null;
  arrivalTrainInfo: null;
  departureTrainInfo: null;
  transferDetails: TransferDetail[];
  sourceMarketEmergencyNumber: string;
  links: Link[];
}


export interface Pax {
  type: string;
  age: number;
}

export interface IBookingPickupInformation {
  from: IFromBooking;
  to: IFromBooking;
  date: string;
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
  companyName: string | null;
}
