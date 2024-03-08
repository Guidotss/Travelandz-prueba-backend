import { UsersEntity } from "../../";

export abstract class UserRepository {
  abstract getUserById(id: string): Promise<UsersEntity>;
}