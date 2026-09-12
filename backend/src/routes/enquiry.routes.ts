import { Router } from "express";
import { createEnquiryLimiter } from "../middleware/rateLimiter";
import {
  createEnquiry,
  deleteEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  updateEnquiryStatus,
} from "../controllers/enquiry.controller";
import { validateRequest } from "../middleware/validateRequest";
import {
  createEnquiryValidator,
  enquiryIdValidator,
  listEnquiriesValidator,
  updateEnquiryValidator,
  updateStatusValidator,
} from "../validators/enquiry.validator";

const router = Router();

router
  .route("/")
  .get(listEnquiriesValidator, validateRequest, getEnquiries)
  .post(createEnquiryLimiter, createEnquiryValidator, validateRequest, createEnquiry);

router
  .route("/:id")
  .get(enquiryIdValidator, validateRequest, getEnquiryById)
  .put(
    [...enquiryIdValidator, ...updateEnquiryValidator],
    validateRequest,
    updateEnquiry
  )
  .delete(enquiryIdValidator, validateRequest, deleteEnquiry);

router.patch(
  "/:id/status",
  [...enquiryIdValidator, ...updateStatusValidator],
  validateRequest,
  updateEnquiryStatus
);

export default router;
