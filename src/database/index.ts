import { connect, set } from "mongoose";

class Database {
  private canDebug = process.env.NODE_ENV !== "production";

  constructor() {
    this.init();
  }

  private init(): void {
    const uri = process.env.MONGO_URL;
    if (uri) {
      connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).catch(() => {
        console.error("Mongo não conectado!");
        process.exit(1);
      });

      set("debug", this.canDebug);
    }
  }
}

export default new Database();
