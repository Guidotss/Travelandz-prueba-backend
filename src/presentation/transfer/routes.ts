import { Router } from "express";
import {
  HotelBedsTrasnferDatasource,
  TransferRepositoryIml,
  UserDataSourceImpl,
  UserRepositoryImpl,
} from "../../infraestructure";
import { TransferController } from "./controllers";

export class TransferRoutes {
  static get routes() {
    const router = Router();

    const userDataSource = new UserDataSourceImpl();
    const userRepository = new UserRepositoryImpl(userDataSource);

    const hotelBedsTransferDatasource = new HotelBedsTrasnferDatasource();
    const transferRepository = new TransferRepositoryIml(
      hotelBedsTransferDatasource
    );
    const transferController = new TransferController(
      transferRepository,
      userRepository
    );
    
    router.get("/booking/:id", transferController.getBookedTransfers);
    router.post("/availables", transferController.getAvailableTransfers);
    router.post("/booking", transferController.bookTransfer);

    return router;
  }
}
