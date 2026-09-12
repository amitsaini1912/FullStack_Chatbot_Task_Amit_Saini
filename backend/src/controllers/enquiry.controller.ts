import { Request, Response } from "express";
import { FilterQuery } from "mongoose";
import { Enquiry, IEnquiry } from "../models/Enquiry";
import { asyncHandler } from "../middleware/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import { AppError } from "../utils/AppError";

export const getEnquiries = asyncHandler(async (req: Request, res: Response) => {
  const { search, userType, status } = req.query as {
    search?: string;
    userType?: string;
    status?: string;
  };
  const page = parseInt((req.query.page as string) || "1", 10);
  const limit = parseInt((req.query.limit as string) || "20", 10);

  const filter: FilterQuery<IEnquiry> = {};

  if (userType) {
    filter.userType = userType;
  }

  if (status) {
    filter.status = status;
  }

  if (search) {
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const searchRegex = new RegExp(escaped, "i");
    filter.$or = [{ name: searchRegex }, { email: searchRegex }, { phone: searchRegex }];
  }

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  const counts = await Enquiry.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const statusCounts: Record<string, number> = {
    New: 0,
    Contacted: 0,
    "In Progress": 0,
    Closed: 0,
  };
  counts.forEach((c: { _id: string; count: number }) => {
    statusCounts[c._id] = c.count;
  });

  sendSuccess(
    res,
    200,
    {
      enquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
      statusCounts,
      totalEnquiries: await Enquiry.countDocuments(),
    },
    "Enquiries fetched successfully"
  );
});

export const getEnquiryById = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  sendSuccess(res, 200, enquiry, "Enquiry fetched successfully");
});

export const createEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, userType, interest, message } = req.body;

  const enquiry = await Enquiry.create({
    name,
    email,
    phone,
    userType,
    interest,
    message,
  });

  sendSuccess(res, 201, enquiry, "Enquiry submitted successfully");
});

export const updateEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, userType, interest, message } = req.body;
  const updates: Record<string, unknown> = { name, email, phone, userType, interest, message };

  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) {
      delete updates[key];
    }
  });

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  sendSuccess(res, 200, enquiry, "Enquiry updated successfully");
});

export const updateEnquiryStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;

  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  sendSuccess(res, 200, enquiry, "Enquiry status updated successfully");
});

export const deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    throw new AppError("Enquiry not found", 404);
  }

  sendSuccess(res, 200, enquiry, "Enquiry deleted successfully");
});
