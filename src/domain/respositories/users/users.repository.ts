import { AddBookDto, UsersEntity } from "../../";

export abstract class UserRepository {
  abstract getUserById(id: string): Promise<UsersEntity>;
  abstract addBook(id: string, addBookDto: AddBookDto[]): Promise<UsersEntity>;
}
