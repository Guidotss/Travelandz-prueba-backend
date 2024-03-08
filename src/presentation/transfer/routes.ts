import { Router } from "express";
import {
  HotelBedsTrasnferDatasource,
  TransferRepositoryIml,
} from "../../infraestructure";
import { TransferController } from "./controllers";

export class TransferRoutes {
  static get routes() {
    const router = Router();
    const hotelBedsTransferDatasource = new HotelBedsTrasnferDatasource();
    const transferRepository = new TransferRepositoryIml(
      hotelBedsTransferDatasource
    );
    const transferController = new TransferController(transferRepository);

    router.post("/availables", transferController.getAvailableTransfers);
    router.post("/booking", transferController.bookTransfer);

    return router;
  }
}
