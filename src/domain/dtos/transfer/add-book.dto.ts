import {
  Booking,
  BookingStatus,
  Holder,
  InvoiceCompany,
  Link,
  ModificationsPolicies,
  Supplier,
  Transfer,
} from "../../";

export class AddBookDto {
  constructor(
    public readonly reference: string,
    public readonly creatationDate: Date,
    public readonly status: BookingStatus,
    public readonly modificationsPolicies: ModificationsPolicies,
    public readonly holder: Holder,
    public readonly transfers: Transfer[],
    public readonly clientReference: string,
    public readonly remark: string,
    public readonly invoiceCompany: InvoiceCompany,
    public readonly supplier: Supplier,
    public readonly totalAmount: number,
    public readonly totalNetAmount: number,
    public readonly pendingAmount: number,
    public readonly currency: string,
    public readonly links: Link[],
    public readonly paymentDataRequired: boolean
  ) {}

  static fromAPI(booking: Booking): AddBookDto {
    const {
      reference,
      creationDate,
      status,
      modificationsPolicies,
      holder,
      transfers,
      clientReference,
      remark,
      invoiceCompany,
      supplier,
      totalAmount,
      totalNetAmount,
      pendingAmount,
      currency,
      links,
      paymentDataRequired,
    } = booking;

    return new AddBookDto(
      reference,
      creationDate,
      status,
      modificationsPolicies,
      holder,
      transfers,
      clientReference,
      remark,
      invoiceCompany,
      supplier,
      totalAmount,
      totalNetAmount,
      pendingAmount,
      currency,
      links,
      paymentDataRequired
    );
  }
}
