import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const createEnquiryLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: "Too many requests from this IP. Please try again later.",
  },
});
