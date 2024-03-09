import { Validators } from "../../../config";

export class GetBookedTransfersDto {
  constructor(public readonly user_id: string) {}

  static fromRequest(user_id: string): [string?, GetBookedTransfersDto?] {
    if (!user_id) {
      return ["User id is required"];
    }
    if (!Validators.objectId.test(user_id)) {
      return ["Invalid id"];
    }
    return [undefined, new GetBookedTransfersDto(user_id)];
  }
}
