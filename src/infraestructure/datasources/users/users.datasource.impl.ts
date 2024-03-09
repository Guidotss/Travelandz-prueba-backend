import {
  AddBookDto,
  CustomError,
  UserDataSource,
  UsersEntity,
} from "../../../domain";
import { prisma } from "../../../data/mongo";

export class UserDataSourceImpl implements UserDataSource {
  async getUserById(id: string): Promise<UsersEntity> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bookings: true,
      },
    });

    if (!user) throw new CustomError(404, "User not found");

    return UsersEntity.fromObj(user);
  }

  async addBook(id: string, addBookDto: AddBookDto[]): Promise<UsersEntity> {
    const user = await this.getUserById(id);
    console.log(user);
    if (!user) throw new CustomError(404, "User not found");

    if (user?.bookings!.length > 0) {
      const ids = user?.bookings!.map((book) => {
        return book.transfers[0].rateKey.split("|")[28];
      });

      const checkIdsSet = new Set(ids);
      const checkIds = ids.includes(
        addBookDto[0].transfers[0].rateKey.split("|")[28]
      );

      if (checkIdsSet.size !== ids.length)
        throw new CustomError(400, "Booking already exists");

      if (checkIds) throw new CustomError(400, "Booking already exists");

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bookings: {
            set: [...user.bookings!, ...addBookDto],
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          bookings: true,
        },
      });

      return UsersEntity.fromObj(updatedUser);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        bookings: {
          set: addBookDto,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        bookings: true,
      },
    });

    return UsersEntity.fromObj(updatedUser);
  }
}
