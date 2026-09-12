import { EnquiryFormData } from "../types/enquiry";

export type FormErrors = Partial<Record<keyof EnquiryFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

export function validateEnquiryForm(data: EnquiryFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name cannot exceed 100 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!data.userType) {
    errors.userType = "Please select who you are";
  }

  if (!data.interest.trim()) {
    errors.interest = "Please tell us what you're interested in";
  } else if (data.interest.trim().length > 150) {
    errors.interest = "Interest cannot exceed 150 characters";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length > 1000) {
    errors.message = "Message cannot exceed 1000 characters";
  }

  return errors;
}
