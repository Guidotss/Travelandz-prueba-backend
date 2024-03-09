import { CustomError, UserDataSource, UsersEntity } from "../../../domain";
import { prisma } from "../../../data/mongo";

export class UserDataSourceImpl implements UserDataSource {
  addBooking(): Promise<UsersEntity> {
    throw new Error("Method not implemented.");
  }
  async getUserById(id: string): Promise<UsersEntity> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    }); 

    if (!user) throw new CustomError(404, "User not found");

    return UsersEntity.fromObj(user);
  }
}
