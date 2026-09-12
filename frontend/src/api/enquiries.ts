import { apiClient } from "./client";
import { Enquiry, EnquiryFormData, EnquiryListResponse, EnquiryStatus } from "../types/enquiry";

export interface EnquiryListParams {
  search?: string;
  userType?: string;
  status?: string;
  page?: number;
  limit?: number;
}

function buildQuery(params: EnquiryListParams): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export function fetchEnquiries(params: EnquiryListParams = {}): Promise<EnquiryListResponse> {
  return apiClient.get<EnquiryListResponse>(`/enquiries${buildQuery(params)}`);
}

export function fetchEnquiryById(id: string): Promise<Enquiry> {
  return apiClient.get<Enquiry>(`/enquiries/${id}`);
}

export function createEnquiry(data: EnquiryFormData): Promise<Enquiry> {
  return apiClient.post<Enquiry>("/enquiries", data);
}

export function updateEnquiry(id: string, data: Partial<EnquiryFormData>): Promise<Enquiry> {
  return apiClient.put<Enquiry>(`/enquiries/${id}`, data);
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Enquiry> {
  return apiClient.patch<Enquiry>(`/enquiries/${id}/status`, { status });
}

export function deleteEnquiry(id: string): Promise<Enquiry> {
  return apiClient.delete<Enquiry>(`/enquiries/${id}`);
}
