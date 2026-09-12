import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { env } from "../config/env";

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  let statusCode = err instanceof AppError ? err.statusCode : 500;
  let message = err instanceof AppError ? err.message : "Internal server error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
  }

  if ((err as { code?: number }).code === 11000) {
    statusCode = 409;
    message = "Duplicate resource";
  }

  if (env.nodeEnv === "development" && !(err instanceof AppError)) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    data: null,
    message,
  });
}
