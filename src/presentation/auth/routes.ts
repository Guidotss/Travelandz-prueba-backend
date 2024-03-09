import { Router } from "express";
import {
  AuthDataSourceImpl,
  AuthRepositoryImpl,
  UserDataSourceImpl,
  UserRepositoryImpl,
} from "../../infraestructure";
import { AuthController } from "./controllers";

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const authDataSource = new AuthDataSourceImpl();
    const userDataSource = new UserDataSourceImpl();

    const authRepository = new AuthRepositoryImpl(authDataSource);
    const userRepository = new UserRepositoryImpl(userDataSource);

    const authController = new AuthController(authRepository, userRepository);

    router.post("/register", authController.register);
    router.post("/login", authController.login);
    router.get("/renew-token", authController.renewToken);
    return router;
  }
}
