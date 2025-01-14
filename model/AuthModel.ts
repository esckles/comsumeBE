import { Document, model, Schema } from "mongoose";

interface iAuth {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isVerifiedToken: string;
}

interface iAuthData extends iAuth, Document {}

const AuthModel = new Schema<iAuthData>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isVerifiedToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iAuthData>("userAuth", AuthModel);
