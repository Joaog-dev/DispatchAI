import axios from "axios";

import { API_BASE_URL } from "@/shared/config/env";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

type ErrorPayload = {
  error?: string;
  message?: string;
  details?: Array<{ description?: string }>;
};

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      const payload = data as ErrorPayload;
      if (payload.details?.length) {
        const description = payload.details.find((item) => item.description)
          ?.description;
        if (description) {
          return String(description);
        }
      }
      if (payload.error) {
        return String(payload.error);
      }
      if (payload.message) {
        return String(payload.message);
      }
    }

    return error.response?.statusText ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Erro inesperado.";
}
