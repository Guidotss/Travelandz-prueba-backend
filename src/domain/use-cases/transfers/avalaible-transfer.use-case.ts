import { AvailableTransferDto, TransferRepository, Service } from "../..";

interface CustomResponse {
  ok: boolean;
  message: string;
  avalaibleTransfers: Service[];
}

interface AvalaibleUseCase {
  execute: (
    avalaibleTransferDto: AvailableTransferDto
  ) => Promise<CustomResponse>;
}

export class AvalaibleTransferUseCase implements AvalaibleUseCase {
  constructor(private readonly transferRepository: TransferRepository) {
    this.transferRepository = transferRepository;
  }

  async execute(
    avalaibleTransferDto: AvailableTransferDto
  ): Promise<CustomResponse> {
    const availableTransfers =
      await this.transferRepository.getAvailableTransfers(avalaibleTransferDto);

    return {
      ok: true,
      message: "Available transfers",
      avalaibleTransfers: availableTransfers!,
    };
  }
}
