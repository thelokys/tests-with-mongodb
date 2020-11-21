import { Schema, model, Document } from "mongoose";

export interface UserViewModel extends Document {
  name: string;
  age: Number;
  avatar_url: String;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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

export default model<UserViewModel>("user", UserSchema);
