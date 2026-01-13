"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { useLoading } from "@/shared/ui/LoadingProvider";

import type { UserRole } from "../api/types";
import { useAuthStore } from "./useAuthStore";
import { getFirstError, registerSchema } from "./validation";

type RegisterFormOptions = {
  onSuccess?: (message: string) => void;
};

export function useRegisterForm(options: RegisterFormOptions = {}) {
  const { register, loading, error } = useAuthStore();
  const { show, hide } = useLoading();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("driver");
  const [status, setStatus] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setValidationError(null);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setValidationError(null);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setValidationError(null);
  };

  const handleRoleValueChange = (value: UserRole) => {
    setRole(value);
    setValidationError(null);
  };

  const clearStatus = () => {
    setStatus(null);
  };

  const clearValidation = () => {
    setValidationError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setValidationError(null);

    const parsed = registerSchema.safeParse({
      name,
      email,
      password,
      role,
    });

    if (!parsed.success) {
      setValidationError(getFirstError(parsed.error));
      return;
    }

    show("criando conta");
    try {
      const response = await register(parsed.data);

      if (response) {
        setPassword("");
        options.onSuccess?.("Cadastro criado. Agora faca o login.");
      }
    } finally {
      hide();
    }
  };

  return {
    name,
    email,
    password,
    role,
    loading,
    error,
    status,
    validationError,
    clearStatus,
    clearValidation,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRoleValueChange,
    handleSubmit,
  };
}
