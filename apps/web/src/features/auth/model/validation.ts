import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Informe o email.")
  .email("Email invalido.");

const passwordSchema = z
  .string()
  .min(8, "Senha precisa ter pelo menos 8 caracteres.")
  .regex(/[a-z]/, "Senha precisa ter ao menos uma letra minuscula.")
  .regex(/\d/, "Senha precisa ter ao menos um numero.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Informe a senha."),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome."),
  email: emailSchema,
  password: passwordSchema,
  role: z.enum(["driver", "dispatcher"]),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export function getFirstError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Dados invalidos.";
}
