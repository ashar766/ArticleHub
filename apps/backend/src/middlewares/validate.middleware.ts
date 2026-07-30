import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { HttpStatus, Message } from "@articlehub/shared";

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: Message.VALIDATION_FAILED,
        errors: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;

    next();
  };
