"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { useLoading } from "@/shared/ui/LoadingProvider";

import { useAuthStore } from "./useAuthStore";
import { getFirstError, loginSchema } from "./validation";

export function useLoginForm() {
  const { login, loading, error, user } = useAuthStore();
  const { show, hide } = useLoading();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setValidationError(null);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setValidationError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const parsed = loginSchema.safeParse({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (!parsed.success) {
      setValidationError(getFirstError(parsed.error));
      return;
    }

    setValidationError(null);
    show("autenticando");
    try {
      await login({ email: parsed.data.email, password: parsed.data.password });
      setPassword("");
    } finally {
      hide();
    }
  };

  return {
    email,
    password,
    loading,
    error,
    validationError,
    user,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    clearValidation: () => setValidationError(null),
  };
}
