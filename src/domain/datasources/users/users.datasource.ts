import { UsersEntity } from "../../";

export abstract class UserDataSource {
  abstract getUserById(id: string): Promise<UsersEntity>;
  abstract addBooking(): Promise<UsersEntity>; 
}
