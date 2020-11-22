import { Request, Express } from "express";
declare global {
  declare namespace Express {
    export interface Request {
      fullUrl: string;
    }
  }
}
