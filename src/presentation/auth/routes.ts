import { Router } from "express";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infraestructure";
import { AuthController } from "./controllers";

export class AuthRoutes {
  static get routes() {
    const router = Router();
    const authDataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(authDataSource);
    const authController = new AuthController(authRepository);

    router.post("/register", authController.register);
    router.post("/login", authController.login);
    return router;
  }
}
