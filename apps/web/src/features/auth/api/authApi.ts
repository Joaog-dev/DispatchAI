import { apiClient } from "@/shared/api/http";

import type {
  AuthLoginRequest,
  AuthMeResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
  AuthResponse,
} from "./types";

export const authApi = {
  login: (payload: AuthLoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", payload).then((res) => res.data),
  me: (token: string) =>
    apiClient
      .get<AuthMeResponse>("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data),
  register: (payload: AuthRegisterRequest) =>
    apiClient
      .post<AuthRegisterResponse>("/auth/register", payload)
      .then((res) => res.data),
};
