import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { HttpStatus, Message } from "@articlehub/shared";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: Message.INTERNAL_SERVER_ERROR,
  });
};
