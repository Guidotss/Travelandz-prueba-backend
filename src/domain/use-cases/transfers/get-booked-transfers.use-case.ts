import { Booking, UserRepository } from "../../";

export interface CustomResponse {
  ok: boolean;
  message: string;
  bookedTransfers: Booking[];
}

export interface IGetBookedTransfersUseCase {
  execute(userId: string): Promise<CustomResponse>;
}

export class GetBookedTransfersUseCase implements IGetBookedTransfersUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string): Promise<CustomResponse> {
    const user = await this.userRepository.getUserById(userId);

    return {
      ok: true,
      message: "Booked transfers retrieved successfully",
      bookedTransfers: user.bookings!,
    };
  }
}
