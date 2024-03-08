type Holder = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

type Transfer = {
  rateKey: string;
  transferDetails: {
    type: string;
    direction: string;
    code: string;
    companyName?: string;
  };
};

export class BookTransferDto {
  constructor(
    public readonly language: string,
    public readonly holder: Holder,
    public readonly transfer: Transfer,
    public readonly welcomeMessage: string,
    public readonly clientReference: string,
    public readonly remark: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromRequest(request: {[key: string]: any;}): [string?, BookTransferDto?] {
    const {
      language,
      holder,
      transfer,
      welcomeMessage,
      clientReference,
      remark,
    } = request;

    const missingFields = [];
    
    if (!language) missingFields.push("language");
    if (!holder) missingFields.push("holder");
    if (!transfer) missingFields.push("transfer");
    if (!transfer.rateKey) missingFields.push("transfer.rateKey");
    if (!transfer.transferDetails)
      missingFields.push("transfer.transferDetails");
    if (!transfer.transferDetails.type)
      missingFields.push("transfer.transferDetails.type");
    if (!transfer.transferDetails.direction)
      missingFields.push("transfer.transferDetails.direction");
    if (!transfer.transferDetails.code)
      missingFields.push("transfer.transferDetails.code");
    if (!welcomeMessage) missingFields.push("welcomeMessage");
    if (!clientReference) missingFields.push("clientReference");
    if (!remark) missingFields.push("remark");

    if (missingFields.length > 1) {
      return [`The fields ${missingFields.join(", ")} are required`, undefined];
    }

    return [
      undefined,
      new BookTransferDto(
        language,
        holder,
        transfer,
        welcomeMessage,
        clientReference,
        remark
      ),
    ];
  }
}
