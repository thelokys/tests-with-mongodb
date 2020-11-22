import { Schema, model, Document } from "mongoose";

export interface IUserSchema extends Document {
  name: string;
  email: String;
  age: Number;
  avatar_url?: String;
  readonly created_at: Date;
  readonly updated_at: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    avatar_url: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

export default model<IUserSchema>("user", UserSchema);
