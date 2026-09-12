import { Schema, model, Document } from "mongoose";

export type UserType = "Student" | "Customer" | "Other";
export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    userType: {
      type: String,
      required: [true, "User type is required"],
      enum: {
        values: ["Student", "Customer", "Other"],
        message: "User type must be Student, Customer, or Other",
      },
    },
    interest: {
      type: String,
      required: [true, "Interest is required"],
      trim: true,
      maxlength: [150, "Interest cannot exceed 150 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["New", "Contacted", "In Progress", "Closed"],
        message: "Status must be New, Contacted, In Progress, or Closed",
      },
      default: "New",
    },
  },
  { timestamps: true }
);

enquirySchema.index({ email: 1 });
enquirySchema.index({ userType: 1 });
enquirySchema.index({ status: 1 });

export const Enquiry = model<IEnquiry>("Enquiry", enquirySchema);
