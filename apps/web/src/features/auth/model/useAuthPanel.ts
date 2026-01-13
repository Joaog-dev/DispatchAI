"use client";

import { useState } from "react";

import { useAuthStore } from "./useAuthStore";
import { useLoginForm } from "./useLoginForm";
import { useRegisterForm } from "./useRegisterForm";

type AuthMode = "login" | "register";

export function useAuthPanel() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [status, setStatus] = useState<string | null>(null);
  const clearError = useAuthStore((state) => state.clearError);
  const loginForm = useLoginForm();
  const registerForm = useRegisterForm({
    onSuccess: (message) => {
      setStatus(message);
      setMode("login");
      clearError();
      loginForm.clearValidation();
    },
  });

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStatus(null);
    clearError();
    registerForm.clearStatus();
    loginForm.clearValidation();
    registerForm.clearValidation();
  };

  return {
    mode,
    status,
    loginForm,
    registerForm,
    switchMode,
  };
}
