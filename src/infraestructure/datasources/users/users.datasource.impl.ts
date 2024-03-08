import { CustomError, UserDataSource, UsersEntity } from "../../../domain";
import { prisma } from "../../../data/mongo";

export class UserDataSourceImpl implements UserDataSource {
  async getUserById(id: string): Promise<UsersEntity> {
    console.log("id", id);
    /* const user = await prisma.user.findUnique({
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

    return UsersEntity.fromObj(user); */
  }
}
