import { BcryptAdapter } from "../../../config";
import { prisma } from "../../../data/mongo";

import {
  AuthDataSource,
  AuthEntity,
  CustomError,
  LoginDto,
  RegisterDto,
} from "../../../domain";

type CompareFunction = (password: string, hash: string) => Promise<boolean>;
type HashFunction = (password: string, salt?: number) => Promise<string>;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly compareFunction: CompareFunction = BcryptAdapter.compare,
    private readonly hashFunction: HashFunction = BcryptAdapter.hash
  ) {}

  private async getUserByEmail(email: string): Promise<AuthEntity | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return null;
    return AuthEntity.fromObj(user);
  }

  async register(registerUserDto: RegisterDto): Promise<AuthEntity> {
    const checkExistUser = await this.getUserByEmail(registerUserDto.email);
    if (checkExistUser) throw new CustomError(400, "User already exists");

    const hashedPassword = await this.hashFunction(registerUserDto.password);
    const user = await prisma.user.create({
      data: {
        email: registerUserDto.email,
        name: registerUserDto.name,
        password: hashedPassword,
        bookings: [],
      },
    });

    return AuthEntity.fromObj(user);
  }
  async login(loginUserDto: LoginDto): Promise<AuthEntity> {
    const user = await this.getUserByEmail(loginUserDto.email);
    if (!user) throw new CustomError(404, "User not found");
    const isPasswordValid = await this.compareFunction(
      loginUserDto.password,
      user.password
    );
    if (!isPasswordValid) throw new CustomError(400, "Invalid credentials");
    return user;
  }
}
