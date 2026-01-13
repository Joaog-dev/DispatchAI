import { z } from "zod";

import { IdSchema, IsoDateTimeSchema } from "./common";

export const UserRoleSchema = z.enum(["dispatcher", "driver"]);

export const AuthLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const AuthRegisterRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: UserRoleSchema,
});

export const AuthResponseSchema = z.object({
  token: z.string().min(1),
  userId: IdSchema,
  name: z.string().min(1),
  email: z.string().email(),
  roles: z.array(UserRoleSchema),
  expiresAt: IsoDateTimeSchema,
});

export const AuthMeResponseSchema = z.object({
  userId: IdSchema,
  name: z.string().min(1),
  email: z.string().email(),
  roles: z.array(UserRoleSchema),
});

export type UserRole = z.infer<typeof UserRoleSchema>;
export type AuthLoginRequest = z.infer<typeof AuthLoginRequestSchema>;
export type AuthRegisterRequest = z.infer<typeof AuthRegisterRequestSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type AuthMeResponse = z.infer<typeof AuthMeResponseSchema>;
