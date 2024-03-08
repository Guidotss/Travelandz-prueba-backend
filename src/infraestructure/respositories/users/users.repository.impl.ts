import { UserDataSource, UserRepository, UsersEntity } from "../../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}
  getUserById(id: string): Promise<UsersEntity> {
    return this.userDataSource.getUserById(id);
  }
}
