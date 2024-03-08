import { Router } from "express";
import { TransferRoutes } from "./transfer/routes";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.use("/transfer", TransferRoutes.routes);

    return router;
  }
}
