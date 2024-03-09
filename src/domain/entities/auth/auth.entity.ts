export class AuthEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromObj(obj: { [key: string]: any }): AuthEntity {
    if (!obj) throw new Error("Object is empty");
    if (!obj.id) throw new Error("Id is empty");
    if (!obj.email) throw new Error("Email is empty");
    if (!obj.name) throw new Error("Name is empty");
    if (!obj.password) throw new Error("Password is empty");

    return new AuthEntity(obj.id, obj.email, obj.name, obj.password);
  }
}
