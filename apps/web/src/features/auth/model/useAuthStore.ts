import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import axios from "axios";

import { getErrorMessage } from "@/shared/api/http";

import { authApi } from "../api/authApi";
import type {
  AuthLoginRequest,
  AuthMeResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "../api/types";

type AuthState = {
  token: string | null;
  user: AuthMeResponse | null;
  loading: boolean;
  error: string | null;
  login: (payload: AuthLoginRequest) => Promise<void>;
  register: (payload: AuthRegisterRequest) => Promise<AuthRegisterResponse | null>;
  logout: () => void;
  refreshMe: () => Promise<void>;
  clearError: () => void;
};

const resolveAuthErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) {
      return "Email ou senha invalidos.";
    }

    if (status === 403) {
      return "Acesso negado.";
    }
  }

  return getErrorMessage(error);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,
      error: null,
      login: async (payload) => {
        set({ loading: true, error: null });
        try {
          const response = await authApi.login(payload);
          set({
            token: response.token,
            user: {
              userId: response.userId,
              name: response.name,
              email: response.email,
              roles: response.roles,
            },
            loading: false,
            error: null,
          });
        } catch (error) {
          set({ loading: false, error: resolveAuthErrorMessage(error) });
        }
      },
      register: async (payload) => {
        set({ loading: true, error: null });
        try {
          const response = await authApi.register(payload);
          set({ loading: false, error: null });
          return response;
        } catch (error) {
          set({ loading: false, error: resolveAuthErrorMessage(error) });
          return null;
        }
      },
      clearError: () => {
        set({ error: null });
      },
      logout: () => {
        set({ token: null, user: null, error: null });
      },
      refreshMe: async () => {
        const token = get().token;
        if (!token) {
          return;
        }

        set({ loading: true, error: null });
        try {
          const user = await authApi.me(token);
          set({ user, loading: false, error: null });
        } catch (error) {
          set({ loading: false, error: resolveAuthErrorMessage(error) });
        }
      },
    }),
    {
      name: "dispatchai-auth",
      partialize: (state) => ({ token: state.token, user: state.user }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
