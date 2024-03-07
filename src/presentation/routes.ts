import { Router, Request, Response } from "express";

export class AppRoutes {
  static get routes() {
    const router = Router();

    router.get("/", (_: Request, res: Response) => {
      res.json({ message: "Hello, world!" });
    });

    return router;
  }
}
 