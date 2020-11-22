import { Request, Response, NextFunction } from "express";
export default async function (
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  request.fullUrl =
    request.protocol + "://" + request.get("host") + request.originalUrl;

  next();
}
