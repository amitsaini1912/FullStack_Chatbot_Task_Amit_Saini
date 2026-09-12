import { body, param, query } from "express-validator";

export const createEnquiryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("userType")
    .trim()
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["Student", "Customer", "Other"])
    .withMessage("User type must be Student, Customer, or Other"),
  body("interest")
    .trim()
    .notEmpty()
    .withMessage("Interest is required")
    .isLength({ max: 150 })
    .withMessage("Interest cannot exceed 150 characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
];

export const updateEnquiryValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("phone")
    .optional()
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("userType")
    .optional()
    .trim()
    .isIn(["Student", "Customer", "Other"])
    .withMessage("User type must be Student, Customer, or Other"),
  body("interest")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Interest cannot exceed 150 characters"),
  body("message")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
];

export const updateStatusValidator = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["New", "Contacted", "In Progress", "Closed"])
    .withMessage("Status must be New, Contacted, In Progress, or Closed"),
];

export const enquiryIdValidator = [
  param("id").isMongoId().withMessage("Invalid enquiry id"),
];

export const listEnquiriesValidator = [
  query("search").optional().trim().isLength({ max: 100 }),
  query("userType").optional().trim().isIn(["Student", "Customer", "Other"]),
  query("status").optional().trim().isIn(["New", "Contacted", "In Progress", "Closed"]),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];
