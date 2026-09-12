import { ApiResponse } from "../types/enquiry";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  status: number;
  errors?: { field?: string; message: string }[];

  constructor(message: string, status: number, errors?: { field?: string; message: string }[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError("Unable to reach the server. Please check your connection.", 0);
  }

  let body: ApiResponse<T> | null = null;
  try {
    body = await response.json();
  } catch {
    // response had no JSON body
  }

  if (!response.ok || !body?.success) {
    throw new ApiError(
      body?.message || "Something went wrong. Please try again.",
      response.status,
      body?.errors
    );
  }

  return body.data as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data) }),
  put: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(data) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
