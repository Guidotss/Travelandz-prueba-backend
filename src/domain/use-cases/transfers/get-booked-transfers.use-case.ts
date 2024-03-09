import { Booking, GetBookedTransfersDto, UserRepository } from "../../";

export interface CustomResponse {
  ok: boolean;
  message: string;
  bookedTransfers: Booking[];
}

export interface IGetBookedTransfersUseCase {
  execute(
    getBookedTransfersDto: GetBookedTransfersDto
  ): Promise<CustomResponse>;
}

export class GetBookedTransfersUseCase implements IGetBookedTransfersUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    getBookedTransfersDto: GetBookedTransfersDto
  ): Promise<CustomResponse> {
    const { user_id } = getBookedTransfersDto;
    const user = await this.userRepository.getUserById(user_id);

    return {
      ok: true,
      message: "Booked transfers retrieved successfully",
      bookedTransfers: user.bookings!,
    };
  }
}
