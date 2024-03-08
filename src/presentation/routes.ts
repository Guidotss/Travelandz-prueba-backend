import { Router } from "express";
import { TransferRoutes } from "./transfer/routes";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use("/auth", AuthRoutes.routes);
    router.use("/transfer", TransferRoutes.routes);

    return router;
  }
}
