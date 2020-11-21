import express, { Application } from "express";

import cors from "cors";
import helmet from "helmet";

import routes from "./routes";
import "./database";

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
  }

  private routes(): void {
    this.server.use("/api", routes);
  }
}

export default new App().server;
