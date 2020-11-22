import express, { Application } from "express";

import cors from "cors";
import helmet from "helmet";

import routes from "./routes";
import fullUrl from "@middlewares/fullUrl";

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(cors());

    this.server.use(fullUrl);
  }

  private routes(): void {
    this.server.use("/api", routes);
  }
}

export default new App().server;
