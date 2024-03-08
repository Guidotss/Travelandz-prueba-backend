export class UsersEntity {
  constructor(public id: string, public name: string, public email: string) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromObj(obj: { [key: string]: any }): UsersEntity {
    const { id, name, email } = obj;

    if (!id) throw new Error("Id is required");
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    return new UsersEntity(id, name, email);
  }
}
