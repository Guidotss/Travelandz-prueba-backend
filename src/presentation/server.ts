import express, { Router } from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";

interface ServerOptions {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: ServerOptions) {
    this.port = options.port;
    this.routes = options.routes;
  }

  start(): void {
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use("/api/v1.0", this.routes);
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}
