export class AvailableTransferDto {
  constructor(
    public readonly language: string,
    public readonly fromType: string,
    public readonly fromCode: string,
    public readonly toType: string,
    public readonly toCode: number,
    public readonly departign: string,
    public readonly adults: number,
    public readonly children: number,
    public readonly infants: number
  ) {}

  public static fromRequest(object: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }): [string?, AvailableTransferDto?] {
    const {
      language,
      fromType,
      fromCode,
      toType,
      toCode,
      departing,
      adults,
      children,
      infants,
    } = object;

    if (
      !language ||
      !fromType ||
      !fromCode ||
      !toType ||
      !toCode ||
      !departing ||
      !adults ||
      !children ||
      !infants
    ) {
      const missingFields = [];
      if (!language) missingFields.push("language");
      if (!fromType) missingFields.push("fromType");
      if (!fromCode) missingFields.push("fromCode");
      if (!toType) missingFields.push("toType");
      if (!toCode) missingFields.push("toCode");
      if (!departing) missingFields.push("departing");
      if (!adults) missingFields.push("adults");
      if (children == undefined) missingFields.push("children");
      if (!infants == undefined) missingFields.push("infants");

      if (missingFields.length > 1) {
        return [
          `The fields ${missingFields.join(", ")} are required`,
          undefined,
        ];
      }
    }

    return [
      undefined,
      new AvailableTransferDto(
        language,
        fromType,
        fromCode,
        toType,
        toCode,
        departing,
        adults,
        children,
        infants
      ),
    ];
  }
}
