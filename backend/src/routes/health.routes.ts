import { Router } from "express";
import { sendSuccess } from "../utils/apiResponse";

const router = Router();

router.get("/", (req, res) => {
  sendSuccess(res, 200, { status: "ok", timestamp: new Date().toISOString() }, "API is healthy");
});

export default router;
