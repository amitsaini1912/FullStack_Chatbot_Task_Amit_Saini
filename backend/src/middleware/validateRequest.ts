import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateRequest(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      data: null,
      message: errors.array()[0].msg,
      errors: errors.array().map((e) => ({
        field: "path" in e ? e.path : undefined,
        message: e.msg,
      })),
    });
    return;
  }

  next();
}
