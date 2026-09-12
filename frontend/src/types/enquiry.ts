export type UserType = "Student" | "Customer" | "Other";
export type EnquiryStatus = "New" | "Contacted" | "In Progress" | "Closed";

export interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  interest: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  userType: UserType | "";
  interest: string;
  message: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EnquiryListResponse {
  enquiries: Enquiry[];
  pagination: Pagination;
  statusCounts: Record<EnquiryStatus, number>;
  totalEnquiries: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors?: { field?: string; message: string }[];
}
