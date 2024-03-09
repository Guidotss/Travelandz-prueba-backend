import { UsersEntity, AddBookDto } from "../../";

export abstract class UserDataSource {
  abstract getUserById(id: string): Promise<UsersEntity>;
  abstract addBook(id: string, addBookDto: AddBookDto[]): Promise<UsersEntity>;
}
