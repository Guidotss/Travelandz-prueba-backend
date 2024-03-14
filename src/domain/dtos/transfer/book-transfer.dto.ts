import { Holder, Transfer } from "../../";

type CustomHolder = Holder & {
  user_id: string;
};

export class BookTransferDto {
  constructor(
    public readonly language: string,
    public readonly holder: CustomHolder,
    public readonly transfers: Transfer[],
    public readonly welcomeMessage: string,
    public readonly clientReference: string,
    public readonly remark: string
  ) {}

  static fromRequest(request: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }): [string?, BookTransferDto?] {
    const {
      language,
      holder,
      transfers,
      welcomeMessage,
      clientReference,
      remark,
    } = request;

    const missingFields = [];
    if (!language) missingFields.push("language");
    if (!holder) missingFields.push("holder");
    if (!transfers) missingFields.push("transfers");

    if (!holder?.name) missingFields.push("holder.name");
    if (!holder?.surname) missingFields.push("holder.surname");
    if (!holder?.email) missingFields.push("holder.email");
    if (!holder?.phone) missingFields.push("holder.phone");
    if (!holder?.user_id) missingFields.push("holder.user_id");

    transfers?.forEach((transfer: Transfer, index: number) => {
      if (!transfer.rateKey) missingFields.push(`transfers[${index}].rateKey`);
      transfer.transferDetails.forEach((transferDetail, detailIndex) => {
        if (!transferDetail.type)
          missingFields.push(
            `transfers[${index}].transferDetails[${detailIndex}].type`
          );
        if (!transferDetail.direction)
          missingFields.push(
            `transfers[${index}].transferDetails[${detailIndex}].direction`
          );
        if (!transferDetail.code)
          missingFields.push(
            `transfers[${index}].transferDetails[${detailIndex}].code`
          );
      });
    });

    if (!clientReference) missingFields.push("clientReference");    

    if (missingFields.length > 0) {
      return [
        `The fields ${missingFields.join(", ")} ${
          missingFields.length > 1 ? "are" : "is"
        } required`,
        undefined,
      ];
    }

    return [
      undefined,
      new BookTransferDto(
        language,
        holder,
        transfers,
        welcomeMessage,
        clientReference,
        remark
      ),
    ];
  }
}
