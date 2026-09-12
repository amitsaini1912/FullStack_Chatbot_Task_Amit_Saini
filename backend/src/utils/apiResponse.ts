import { Response } from "express";

interface ApiResponseShape<T> {
  success: boolean;
  data: T | null;
  message: string;
}

export function sendSuccess<T>(
  res: Response,
  statusCode: number,
  data: T,
  message = "Success"
): Response<ApiResponseShape<T>> {
  return res.status(statusCode).json({ success: true, data, message });
}

export function sendError(
  res: Response,
  statusCode: number,
  message = "Something went wrong"
): Response<ApiResponseShape<null>> {
  return res.status(statusCode).json({ success: false, data: null, message });
}
