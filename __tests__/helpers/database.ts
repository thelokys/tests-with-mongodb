import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error("MongoDB servernot initialized");
  }

  await mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const disconnect = async (): Promise<void> => {
  await mongoose.connection.close();
};
