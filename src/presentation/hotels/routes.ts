import { Router } from "express";
import { HotelBedsHotelsDataource, HotelsRepositoryImpl } from "../../infraestructure";
import { HotelsControllers } from "./controllers";


export class HotelsRoutes {
  static get routes() {
    const router = Router();

    const hotelsDataSource = new HotelBedsHotelsDataource();
    const hotelsRepository = new HotelsRepositoryImpl(hotelsDataSource);
    const hotelsController = new HotelsControllers(hotelsRepository);

    router.get("/", hotelsController.getHotels);

    return router;
  }
}
