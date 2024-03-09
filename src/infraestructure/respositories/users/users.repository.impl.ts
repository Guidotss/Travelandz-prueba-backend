import {
  AddBookDto,
  UserDataSource,
  UserRepository,
  UsersEntity,
} from "../../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}
  addBook(id: string, addBookDto: AddBookDto[]): Promise<UsersEntity> {
    return this.userDataSource.addBook(id, addBookDto);
  }
  getUserById(id: string): Promise<UsersEntity> {
    return this.userDataSource.getUserById(id);
  }
}
